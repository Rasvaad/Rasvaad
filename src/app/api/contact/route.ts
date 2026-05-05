import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  members?: string;
  category?: string;
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as ContactPayload;

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const location = body.location?.trim();
  const members = body.members?.trim();
  const category = body.category?.trim();
  const message = body.message?.trim();

  // Mandatory fields: name, phone, location
  if (!name || !phone || !location) {
    return Response.json(
      { success: false, error: "Name, phone and location are required." },
      { status: 400 },
    );
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const to = process.env.EMAIL_TO ?? "rasvaad@gmail.com";

  if (!user || !pass) {
    return Response.json(
      { success: false, error: "Email service is not configured." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden;">
      <div style="background:#7A1E1E;padding:24px 32px;">
        <h2 style="color:#D4AF37;margin:0;font-size:20px;">New Catering Inquiry</h2>
        <p style="color:#fff;margin:4px 0 0;font-size:13px;">Rasvaad Catering</p>
      </div>
      <div style="padding:32px;background:#fff;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;font-weight:700;color:#222;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;font-weight:700;color:#222;">${phone}</td></tr>
          ${email ? `<tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#222;">${email}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#888;">Location</td><td style="padding:8px 0;color:#222;">${location}</td></tr>
          ${members ? `<tr><td style="padding:8px 0;color:#888;">Members</td><td style="padding:8px 0;color:#222;">${members}</td></tr>` : ""}
          ${category ? `<tr><td style="padding:8px 0;color:#888;">Category</td><td style="padding:8px 0;color:#222;">${category}</td></tr>` : ""}
        </table>
        ${message ? `
        <div style="margin-top:20px;padding:16px;background:#f9f6f1;border-radius:8px;">
          <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
          <p style="margin:8px 0 0;color:#222;line-height:1.6;">${message}</p>
        </div>
        ` : ""}
      </div>
      <div style="padding:16px 32px;background:#f9f6f1;font-size:12px;color:#aaa;text-align:center;">
        Sent from rasvaad site contact form
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Rasvaad Website" <${user}>`,
      to,
      subject: `New Inquiry from ${name}`,
      replyTo: email ?? user,
      html,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email ?? "-"}\nLocation: ${location}\nMembers: ${members ?? "-"}\nCategory: ${category ?? "-"}\nMessage: ${message ?? "-"}`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return Response.json(
      { success: false, error: "Failed to send email. Please try again." },
      { status: 500 },
    );
  }
}
