import rc from 'rc'

export type ConfigT = {
    bot_section: {
        bot_token: string
    },
    proxy: {
        host: string,
        port: string,
        login: string,
        psswd: string,
    },
}

export function getConfig(name: string): ConfigT {

    const config = rc(name)
    if (!config) {
        throw Error(`Config by name ${name} not found!`)
    }
    return <ConfigT>config

}