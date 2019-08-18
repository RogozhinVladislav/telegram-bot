import rc from 'rc'

export type ConfigT = {
    bot_section: {
        bot_token: string
    },
    db_section: {
        host: string,
        port: string,
        database: string,
        user: string,
        password: string
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