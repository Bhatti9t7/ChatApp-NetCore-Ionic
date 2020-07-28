using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatAPI.Models;
namespace ChatAPI.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}