const clients = {
    'ea02191f-8f88-43c9-b6b0-19502aa36470': {
        name: '1',
        address: '10.7.0.1',
        privateKey: 'kGHAk4Pw6w1p+pgoK4NYZtHJppyrJMGhpygACn0ZrUI=',
        publicKey: 'Ez++GbyTdhWDO74rjf40e/0By9F0e5Y8A78e0kT7a3U=',
        preSharedKey: '3Cz4iEevKnyxqpESMzv8cqbWJn3gi5mF7TIxlyfGDrY=',
        createdAt: '2022-09-24T20:45:24.161Z',
        updatedAt: '2022-09-24T20:45:24.161Z',
        enabled: true,
    },
    'bce6004e-b57d-478d-8b41-6e2ef1662164': {
        clientId: 'bce6004e-b57d-478d-8b41-6e2ef1662164',
        name: 'Device-1',
        address: '10.7.0.162',
        privateKey: 'uLlJdIf0LQK1ytotnxEuVZtfyuTJRK38rIu0qYlsM1k=',
        publicKey: '+zFftkpCiJe8FwQV8onbY/C4uOmvbmRLWbbOHS3u43k=',
        preSharedKey: 'p1S+KF5yka1pUFi7/Sa3EuptRTqXxk0/Ovr/OnXsAIA=',
        createdAt: '2022-10-31T16:44:21.457Z',
        updatedAt: '2022-10-31T16:44:21.457Z',
        enabled: true,
    },
    'bce6004e-b57d-478d-8b41-6e2ef1662457': {
        clientId: 'bce6004e-b57d-478d-8b41-6e2ef1662164',
        name: 'Device-1',
        address: '10.7.1.75',
        privateKey: 'uLlJdIf0LQK1ytotnxEuVZtfyuTJRK38rIu0qYlsM1k=',
        publicKey: '+zFftkpCiJe8FwQV8onbY/C4uOmvbmRLWbbOHS3u43k=',
        preSharedKey: 'p1S+KF5yka1pUFi7/Sa3EuptRTqXxk0/Ovr/OnXsAIA=',
        createdAt: '2022-10-31T16:44:21.457Z',
        updatedAt: '2022-10-31T16:44:21.457Z',
        enabled: true,
    },
};
const clientsArray = Object.values(clients);

const ipsLimit = [];

clientsArray.map((c) => {
    ipsLimit.push(c.address);
});

const ips = []

let sIp = '10.7.0.1'
let i = 1
do {
    i = i + 1
    const tIP = sIp.split('.', 4)
    let ip = (tIP[0] << 24) | (tIP[1] << 16) | (tIP[2] << 8) | (tIP[3] << 0)
    ip++
    const nextIP = [
        (ip >> 24) & 0xff,
        (ip >> 16) & 0xff,
        (ip >> 8) & 0xff,
        (ip >> 0) & 0xff,
    ]
    sIp = nextIP.join('.')
    ips.push(nextIP.join('.'))
} while (i !== 65535)

const newIps = ips.filter(e => !~ipsLimit.indexOf(e))
