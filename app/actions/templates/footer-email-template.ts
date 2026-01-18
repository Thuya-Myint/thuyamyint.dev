export function getFooterEmailTemplate(email: string, message: string): string {
  const currentYear = new Date().getFullYear();
  const formattedMessage = message.replace(/\n/g, "<br>");

  return `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; text-align: center;">
        <img src="https://thuyamyint.dev/t.png" alt="Logo" style="width: 60px; height: 60px; border-radius: 50%; background: white; padding: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: white; margin: 15px 0 0 0; font-size: 24px; font-weight: 700;">New Inquiry</h1>
    </div>
    <div style="padding: 30px; color: #333333;">
        <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Sender Email</p>
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111111;">${email}</p>
        </div>
        <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <div style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333; background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                ${formattedMessage}
            </div>
        </div>
    </div>
    <div style="padding: 30px; background-color: #f3f4f6; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #111111;">Thuya Myint</p>
        <div style="margin-bottom: 20px;">
            <a href="https://github.com/Thuya-Myint" style="text-decoration: none; margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 24px; height: 24px;">
            </a>
            <a href="https://www.linkedin.com/in/thuya-myint-28ba4639a/" style="text-decoration: none; margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 24px; height: 24px;">
            </a>
            <a href="https://www.facebook.com/thuya.myint.88143/" style="text-decoration: none; margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;">
            </a>
        </div>
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
            &copy; ${currentYear} Thuya Myint. All rights reserved.<br>
            <a href="https://thuyamyint.dev" style="color: #3b82f6; text-decoration: none;">thuyamyint.dev</a>
        </p>
    </div>
</div>
  `;
}
