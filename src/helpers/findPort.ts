import portfinder from 'portfinder';

const firstGameServerPort = 9001;
const lastGameServerPort = 65535;

/**
 * Function to find the a Port for the TCP Socket.
 * If an argument gets passed via the command line, that argument is used.
 * If not than an unused open port gets used
 * 
 * @returns the port as promise
 */
export default async function findPort(): Promise<Number> {
    return new Promise(async (resolve, reject) => {
        const processPort: string[] = process.argv.slice(2);
        let port: number = processPort.length === 0 ? -1 : +processPort[0];

        if(port === -1) {
            resolve(await portfinder.getPortPromise({port: firstGameServerPort, stopPort: lastGameServerPort}));
        } else {
            resolve(port);
        }
    });
}