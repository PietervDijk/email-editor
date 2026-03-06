const signatureTemplate = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Email handtekening — Technolab Leiden 25/26</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; margin:0; padding:20px; background:#fdfdfd; min-width: 700px; } 
      .sig-container { width:700px; } 
      .social img{ width:22px; height:22px; display:block }
      table { table-layout: fixed; }
    </style>
  </head>
  <body>
    <div class="sig-container">
      <table class="two-col" cellspacing="0" cellpadding="0" style="width:700px; border-collapse:collapse; table-layout:fixed;">
        <tr>
          <td style="vertical-align:middle; padding:8px; width:55%;">
              <div style="color:#4B2E83; font-weight:700; font-size:20px; margin-bottom:8px; margin-left:10px;">
              (Naam)
            </div>
          </td>

          <td class="vertical-divider" rowspan="2" style="width:6px; padding:0;">
            <img src="(DIVIDER)" alt="" style="width:2px; height:190px; display:block; margin:35px auto 0 -30px;" />
          </td>

          <td style="vertical-align:middle; text-align:right; width:36%; padding:8px 16px;">
            <a href="(LOGO_LINK)">
              <img src="(LOGO)" alt="Technolab Leiden" style="max-width:220px; height:auto; position:relative; left:15px;" />
            </a>
          </td>
        </tr>

        <tr>
          <td style="vertical-align:top; padding:8px; width:55%;">
            <table cellspacing="0" cellpadding="0" style="margin-left:10px;">
              <tr>
                <td width="18">
                  <img src="https://img.icons8.com/ios-filled/50/8DC63F/user.png" width="20" height="20" alt="" style="margin-right:8px;">
                </td>
                <td style="color:#333;">
                  (functie)<br>(aanwezig)
                </td>
              </tr>
              <tr>
                <td>
                  <img src="https://img.icons8.com/ios-filled/50/8DC63F/phone.png" width="20" height="20" alt="" style="margin-right:8px;">
                </td>
                <td style="color:#333;">(tel.)</td>
              </tr>
              <tr>
                <td>
                  <img src="https://img.icons8.com/ios-filled/50/8DC63F/new-post.png" width="20" height="20" alt="" style="margin-right:8px;">
                </td>
                <td>(e-mailadres)</td>
              </tr>
            </table>
          </td>

          <td style="vertical-align:top; padding:8px; width:40%;">
            <table cellspacing="0" cellpadding="0" style="margin-left:-10px;">
              <tr>
                <td width="18">
                  <img src="https://img.icons8.com/ios-filled/50/8DC63F/marker.png" width="20" height="20" alt="" style="margin-right:8px;">
                </td>
                <td style="color:#333;">
                  Bètaplein 28<br>2321KS Leiden
                </td>
              </tr>
              <tr>
                <td>
                  <img src="https://img.icons8.com/ios-filled/50/8DC63F/domain.png" width="20" height="20" alt="" style="margin-right:8px;">
                </td>
                <td>
                  <a href="(WEBSITE_LINK)" style="color:#3b2a5a; text-decoration:underline;">(WEBSITE_NAME)</a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="https://img.icons8.com/ios-filled/50/8DC63F/phone.png" width="20" height="20" alt="" style="margin-right:8px;">
                </td>
                <td style="color:#333;">(COMPANY_PHONE)</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="3" style="padding-top:16px;">
            (BANNER_AND_SOCIAL)
          </td>
        </tr>

      </table>
    </div>
  </body>
</html>`;

// Banner + social (links uitgelijnd, social naast elkaar aan de rechterkant van de banner)
const bannerWithSocial = `
  <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
    <tr>
      <td style="vertical-align:top;">
        <a href="(BANNER_LINK)" style="display:block;">
          <img src="(BANNER)" width="520" alt="Meesterchallenge banner"
               style="width:520px; max-width:520px; height:auto; display:block; border-radius:12px;" />
        </a>
      </td>
      <td style="vertical-align:top;">
        <div style="color:#4B2E83; font-weight:700; margin-bottom:6px; margin-top: 17px; margin-left: 70px;">volg ons:</div>
        <table cellspacing="0" cellpadding="0" class="social" style="margin-left:65px;">
          <tr>
            <td style="padding-right:8px;">
              <a href="https://www.instagram.com/technolableiden/">
                <img src="https://img.icons8.com/ios-filled/50/3b2a5a/instagram-new--v1.png" alt="Instagram">
              </a>
            </td>
            <td style="padding-right:8px;">
              <a href="https://www.linkedin.com/company/technolab-leiden/?originalSubdomain=nl">
                <img src="https://img.icons8.com/ios-filled/50/3b2a5a/linkedin.png" alt="LinkedIn">
              </a>
            </td>
            <td>
              <a href="mailto:info@technolableiden.nl">
                <img src="https://img.icons8.com/ios-filled/50/3b2a5a/new-post.png" alt="Mail">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

