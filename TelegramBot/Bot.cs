using Newtonsoft.Json;
using System.Security.Cryptography;
using Telegram.Bot;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;

namespace TelegramBot
{
    public static class Bot
    {
        public static ITelegramBotClient BotClient;
        private static ReceiverOptions _receiverOptions;
        private static long _chatId;

        static Bot()
        {
            BotClient = new TelegramBotClient("6486355671:AAEAeRFkImuGP9zH0SbIiIIoZW0S3o0KWgw");
            _receiverOptions = new ReceiverOptions
            {
                AllowedUpdates = [ UpdateType.Message ],
                ThrowPendingUpdates = true,
            };
        }

        public static async Task Main()
        {
            using var cts = new CancellationTokenSource();
            BotClient.StartReceiving(UpdateHandler, ErrorHandler, _receiverOptions, cts.Token);

            var bot = await BotClient.GetMeAsync();
            Console.WriteLine($"{bot.FirstName} запущен!");

            await Task.Delay(-1);
        }

        public static async Task UpdateHandler(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
        {
            try
            {
                switch (update.Type)
                {
                    case UpdateType.Message:
                        {
                            var message = update.Message;
                            var user = message.From;
                            Console.WriteLine($"{user.FirstName} ({user.Id}) написал сообщение: {message.Text}");

                            var chat = message.Chat;
                            _chatId = chat.Id;

                            ChatIdManager.SaveChatId(_chatId);

                            if (message.Text.StartsWith("/start"))
                            {
                                await botClient.SendTextMessageAsync(_chatId, "Добро пожаловать! Спасибо, что присоединились к нашему чату.");
                                return;
                            }

                            await botClient.SendTextMessageAsync(chat.Id, message.Text, replyToMessageId: message.MessageId);
                            return;
                        }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public static Task ErrorHandler(ITelegramBotClient botClient, Exception error, CancellationToken cancellationToken)
        {
            var ErrorMessage = error switch
            {
                ApiRequestException apiRequestException
                    => $"Telegram API Error:\n[{apiRequestException.ErrorCode}]\n{apiRequestException.Message}",
                _ => error.ToString()
            };

            Console.WriteLine(ErrorMessage);
            return Task.CompletedTask;
        }
    }

    public static class ChatIdManager
    {
        private static string _filePath = Path.Combine(GetChatIdDirectory(), "chatId.json");

        public static void SaveChatId(long chatId)
        {
            var chatIdInfo = new ChatIdInfo { ChatId = chatId };
            var encryptedChatId = Encrypt(chatIdInfo.ChatId.ToString());
            var json = JsonConvert.SerializeObject(new { EncryptedChatId = encryptedChatId }, Formatting.Indented);
            System.IO.File.WriteAllText(_filePath, json);
        }

        public static long GetChatId()
        {
            if (System.IO.File.Exists(_filePath))
            {
                var json = System.IO.File.ReadAllText(_filePath);
                var encryptedChatId = JsonConvert.DeserializeObject<dynamic>(json).EncryptedChatId.ToString();
                var decryptedChatId = Decrypt(encryptedChatId);
                return Convert.ToInt64(decryptedChatId);
            }

            return 0;
        }

        private static string Encrypt(string plainText)
        {
            byte[] encrypted;
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Key = Convert.FromBase64String("AAECAwQFBgcICQoLDA0ODw==");
                rijAlg.Mode = CipherMode.ECB;
                ICryptoTransform encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                using (var msEncrypt = new MemoryStream())
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                            swEncrypt.Write(plainText);
                        encrypted = msEncrypt.ToArray();
                    }
            }
            return Convert.ToBase64String(encrypted);
        }

        private static string Decrypt(string cipherText)
        {
            byte[] cipherTextBytes = Convert.FromBase64String(cipherText);
            string plaintext = null;
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Key = Convert.FromBase64String("AAECAwQFBgcICQoLDA0ODw==");
                rijAlg.Mode = CipherMode.ECB;
                ICryptoTransform decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);
                using (var msDecrypt = new MemoryStream(cipherTextBytes))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        using (var srDecrypt = new StreamReader(csDecrypt))
                            plaintext = srDecrypt.ReadToEnd();
                }
            }
            return plaintext;
        }

        private static string GenerateEncryptionKey()
        {
            using (var aes = Aes.Create())
            {
                aes.GenerateKey();
                return Convert.ToBase64String(aes.Key);
            }
        }

        private static string GetChatIdDirectory()
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var solutionDirectory = FindSolutionDirectory(currentDirectory);

            if (solutionDirectory != null)
                return solutionDirectory;

            throw new FileNotFoundException("No solution file found in the current or parent directories.");
        }

        private static string FindSolutionDirectory(string directory)
        {
            while (directory != null)
            {
                var solutionFiles = Directory.GetFiles(directory, "*.sln");

                if (solutionFiles.Length > 0)
                    return directory;

                directory = Directory.GetParent(directory)?.FullName;
            }

            return null;
        }
    }

    public class ChatIdInfo
    {
        public long ChatId { get; set; }
    }
}
