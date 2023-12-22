using Telegram.Bot.Polling;
using Telegram.Bot.Types.Enums;
using Telegram.Bot;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Types;

namespace TelegramBot
{
    public static class Bot
    {
        public readonly static ITelegramBotClient? BotClient = new TelegramBotClient("6486355671:AAEAeRFkImuGP9zH0SbIiIIoZW0S3o0KWgw");
        private static ReceiverOptions? _receiverOptions;

        public static async Task Main()
        {
            _receiverOptions = new ReceiverOptions
            {
                AllowedUpdates = [UpdateType.Message],
                ThrowPendingUpdates = true,
            };

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
}