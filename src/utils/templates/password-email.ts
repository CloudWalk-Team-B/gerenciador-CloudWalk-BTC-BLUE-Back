export function passwordRecoveryTemplate(name, newPassword) {
  const temp = {
    template: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap"
          rel="stylesheet"
        />
        <title>Reset Password</title>
      </head>
      <body style="font-family: Quicksand; text-align: center">
        <div>
          <img
          style="width: 50%"
            src="https://lh3.google.com/u/0/d/1BoZ0aNM6VprrZJyW_WJais4FtArc76IT=w869-h611-iv3"
          />
          <div
            style="
              font-size: 40px;
              color: white;
              margin: 40px 35%;
              background-color: rgb(96, 26, 74);
              width: 30%;
              border-radius: 50px;
            "
          >
            ${newPassword}
          </div>
          <a href="mailto:capivara.bootcamp@gmail.com">
            <img
            style="width: 50%"
              src="https://lh3.google.com/u/0/d/12MY60KLzUmoVMEei65rPsQeFJ5MC0kbB=w869-h611-iv1"
            />
          </a>
        </div>
      </body>
    </html>
    `,
  };
  return temp;
}
