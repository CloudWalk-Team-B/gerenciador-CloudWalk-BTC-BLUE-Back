export function authUserTemplate(name, code) {
  const temp = {
    template: `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap" rel="stylesheet">
      <title>Reset Password</title>
    </head>
    <body style="font-family:Quicksand ; text-align: center;" >
      <header style="background-color:rgb(95,26,73); text-align: center;  justify-content: center; align-items: center; color: white; width: 80%; margin-left: 10%;  " >
        <img style="height: 80px; margin: 10px;" src="https://i.imgur.com/f1S0WLr.png" />
        <h1 style=" margin: 0; font-size: 25px; text-align: center;" >
          Capivara </br>
          Shop
        </h1>
      </header>
      <div style="display: inline-table; flex-direction: column; align-items:center ; font-size: 20px; color: rgb(95,26,73); vertical-align: top; background: transparent; table-layout: fixed;">
        <p>Ola ${name},</p>
        <p style="text-align: center" >Sua conta em noso site foi criada com sucesso </p>
        <p>Para ativar sua conta, por favor clique no botão abaixo, ou acesse pelo link no final da mensagem</p>
          <div style="color:white ; background-color: rgb(95,26,73); width: 15%; text-align: center; height: 40px; border-radius: 50px; display: flex; justify-content: center; align-items: center; display: inline-block; padding-top: 6px; width: 150px; "><a href='http://localhost:3333/user/auth-user/${code}'>Clique Aqui</a></div>
        <p>Caso o botão não funcione, por favor, utilize o link abaixo: <br>
        http://localhost:3333/user/auth-user/${code}
        </p>
      </div>
    </body>
  </html>`,
  };
  return temp;
}
