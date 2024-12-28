export const resetPasswordTemplate = (resetCode) => ({
  subject: "Password Reset Code",
  text: `Your password reset code is: ${resetCode}`,
  html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Password Reset</h2>
        <p style="color: #666;">Your password reset code is:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f5f5f5; padding: 15px; 
                      border-radius: 5px; font-size: 24px; letter-spacing: 5px;">
            ${resetCode}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          This code will expire in 10 minutes.<br>
          If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `,
});

export const activationEmailTemplate = (activationLink) => ({
  subject: "Account Activation - Please verify your email",
  text: `Please click on the following link to activate your account: ${activationLink}`,
  html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Account Activation</h2>
        <p style="color: #666;">Please click on the button below to activate your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${activationLink}" 
             style="background-color: #4CAF50; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Activate Account
          </a>
        </div>
        <p style="color: #666; font-size: 12px;">
          If the button doesn't work, copy and paste this link in your browser:<br>
          ${activationLink}
        </p>
      </div>
    `,
});
