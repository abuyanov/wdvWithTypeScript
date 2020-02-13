using Atalasoft.Imaging.Codec;
using Atalasoft.Imaging.Codec.Pdf;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace TypeWdv
{
    public class Program
    {
        public static void Main(string[] args)
        {
            RegisteredDecoders.Decoders.Add(new PdfDecoder());
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
