export default class FetchRequest
{
    constructor(uri, method = 'GET', body = null)
    {
        this.url = `${location.protocol}//${location.host}/${uri}`
        this.method = method
        this.body = body
    }

    send ()
    {
        const _this = this
        return new Promise((resolve, reject) => {
            const options = _this._getRequestOptions()
            fetch(this.url, options)
                .then(response => response.ok ? response.json() : response.statusText)
                .then(data => {
                    if (typeof data === 'string')
                        return reject(data)

                    return resolve(data)
                })
                .catch(error => reject(error))
        })
    }

    _getRequestOptions ()
    {
        const options = {
            method: this.method,
            headers: { 'Content-Type': 'application/json' }
        }
        if (this.method === 'POST' || this.method === 'PUT')
            options.body = JSON.stringify(this.body)

        return options
    }
}