// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresSensorMq02
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            user: 'aluno',
            password: 'sptech',
            database: 'minetech',
            port: 3306
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const sensorMq02 = parseFloat(data);

        //AQUI IREMOS ADICIONAR A STRING PARA O NIVEL DO GÁS
        let nivelGas = '';
    if(sensorMq02 == 0){
        nivelGas = 'Sem risco algum'
    }else if (sensorMq02 > 0 && sensorMq02 <= 1){
            nivelGas = 'Alerta';
        } else if (sensorMq02 >= 1 && sensorMq02 < 2){
            nivelGas = 'Evacuar área';
        } else if (sensorMq02 >= 2 && sensorMq02 < 3){
            nivelGas = 'Evacuação total';
        } else if (sensorMq02 >= 3 && sensorMq02 <= 5){
            nivelGas = 'Risco de explosão';
        }
        // ------------------

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorMq02.push(sensorMq02);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'INSERT INTO medicao (nivelMetano, statusNivel, fkSensor) VALUES (?, ?, ?)',
                [sensorMq02, nivelGas, 1]
            );

            await poolBancoDados.execute(
                'INSERT INTO medicao (nivelMetano, statusNivel, fkSensor) VALUES (?, ?, ?)',
                [sensorMq02 + 0.4, nivelGas, 2]
            );
            
            await poolBancoDados.execute(
                'INSERT INTO medicao (nivelMetano, statusNivel, fkSensor) VALUES (?, ?, ?)',
                [sensorMq02/2, nivelGas, 3]
            );

            await poolBancoDados.execute(
                'INSERT INTO medicao (nivelMetano, statusNivel, fkSensor) VALUES (?, ?, ?)',
                [sensorMq02 + 0.2, nivelGas, 4]
            );
         }
    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorMq02
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensor/mq02', (_, response) => {
        return response.json(valoresSensorMq02);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorMq02 = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorMq02
    );

    // inicia o servidor web
    servidor(
        valoresSensorMq02
    );
})();
