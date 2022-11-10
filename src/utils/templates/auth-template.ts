export function authUserTemplate(name, code) {
  const temp = {
    template: `<html lang="en">
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
        style="width: 50%" src="https://lh3.google.com/u/0/d/1qkNKybCqBl6QZSHDs8m2AeDpmXTeusN8=w912-h563-iv1"
        />
        <a
        href="https://capivara-shop.vercel.app/validate-user/${code}"
          style="
            font-size: 40px;
            color: white;
            margin: 40px 35%;
            background-color: rgb(96, 26, 74);
            width: 30%;
            border-radius: 50px;
          "
        >
          Verificar
        </a>
        <a href="mailto:capivara.bootcamp@gmail.com">
          <img
            src="https://lh3.google.com/u/0/d/1-oBDnh_Lfty0GzyX1oZh8s29GUiuaBfb=w912-h563-iv1"
          />
        </a>
        <p>https://capivara-shop.vercel.app/validate-user/${code} </p>


      </div>
    </body>
  </html>`,
  };
  return temp;
}
