import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log("[send-email] to:", body.to);
    console.log("[send-email] data:", body.data);

    if (!body.to) {
        throw createError({
            statusCode: 400,
            statusMessage:
                "No recipient email set — add recipient_email to your Storyblok FormContainer block.",
        });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const firstName = (body.data["First name"] ?? "Someone")
        .trim()
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const rows = Object.entries(body.data)
        .map(
            ([key, value]) => `
            <tr>
                <td style="padding:10px 16px;background:#f5f5f5;font-weight:600;color:#333;width:160px;vertical-align:top;border-bottom:1px solid #e0e0e0">${key}</td>
                <td style="padding:10px 16px;color:#555;border-bottom:1px solid #e0e0e0">${value}</td>
            </tr>`,
        )
        .join("");

    const html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
            <div style="background:#e27609;padding:24px 32px">
                <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:0.5px">${firstName} sent you a new message</h1>
            </div>
            <table style="width:100%;border-collapse:collapse">
                ${rows}
            </table>
        </div>`;

    const info = await transporter.sendMail({
        from: `"Wild Bikes" <${process.env.EMAIL_USER}>`,
        to: body.to,
        subject: "New Form Submission — Wild Bikes",
        html,
    });

    console.log("[send-email] sent:", info.messageId);

    return { success: true };
});
