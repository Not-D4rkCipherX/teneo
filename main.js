const _0x12ab = require('ws');
const _0x34cd = require('fs/promises');
const { HttpsProxyAgent: _0x56ef } = require('https-proxy-agent');
const { SocksProxyAgent: _0x78gh } = require('socks-proxy-agent');
const _0x9aij = require('readline');
const _0xklmn = require('colors');
const _0xopqr = require('axios');
const { config: _0xstuv } = require('./config');
const _0xfetch = (..._0xargs) => import('node-fetch').then(({ default: _0xfetch }) => _0xfetch(..._0xargs));

// Decryption function for encoded strings
const _0xdecrypt = (_0xstr) => {
  return Buffer.from(_0xstr, 'base64').toString('utf-8');
};

// Encoded critical strings
const _0xstrings = {
  telegram: _0xdecrypt('aHR0cHM6Ly90Lm1lL0Q0cmtDaXBoZXJY'),
  wsUrl: _0xdecrypt('d3NzOi8vc2VjdXJlLndzLnRlbmVvLnBybw=='),
  apiUrl: _0xdecrypt('aHR0cHM6Ly9hcGkudGVuZW8ucHJvL2FwaS91c2Vycy9yZWZlcnJhbHM='),
  claimUrl: _0xdecrypt('aHR0cHM6Ly9hcGkudGVuZW8ucHJvL2FwaS91c2Vycy9yZWZlcnJhbHMvY2xhaW0='),
  proxyUrl: _0xdecrypt('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21vbm9zYW5zL3Byb3h5LWxpc3QvbWFpbi9wcm94aWVzL2FsbC50eHQ='),
  xApiKey: _0xstuv.X_API_KEY,
};

// Open Telegram link
import('open').then((_0xopen) => {
  _0xopen.default(_0xstrings.telegram);
}).catch(_0xerr => {
  console.log(_0xdecrypt('RmFpbGVkIHRvIG9wZW4gVGVsZWdyYW0gbGluaw==').red);
});

function _0xheaders(_0xtoken) {
  return {
    Authorization: `Bearer ${_0xtoken}`,
    'User-Agent': _0xdecrypt('TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExNS4wLjAuMCBTYWZhcmkvNTM3LjM2'),
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
    Referer: _0xdecrypt('aHR0cHM6Ly9kYXNoYm9hcmQudGVuZW8ucHJvLw=='),
    Origin: _0xdecrypt('aHR0cHM6Ly9kYXNoYm9hcmQudGVuZW8ucHJv'),
    'Sec-Ch-Ua': _0xdecrypt('Ik5vdC9BKUJyYW5kIjt2PSI5OSIsICJHb29nbGUgQ2hyb21lIjt2PSIxMTUiLCAiQ2hyb21pdW0iO3Y9IjExNSI='),
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': _0xdecrypt('IldpbmRvd3Mi'),
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'x-api-key': _0xstrings.xApiKey,
  };
}

function _0xgetProxyAgent(_0xproxyUrl) {
  try {
    const _0xisSocks = _0xproxyUrl.toLowerCase().startsWith('socks');
    return _0xisSocks ? new _0x78gh(_0xproxyUrl) : new _0x56ef(_0xproxyUrl);
  } catch (_0xerror) {
    console.log(`${_0xdecrypt('RmFpbGVkIHRvIGNyZWF0ZSBwcm94eQ==')} ${_0xproxyUrl}: ${_0xerror.message}`.yellow);
    return null;
  }
}

async function _0xreadFile(_0xfilePath) {
  try {
    const _0xdata = await _0x34cd.readFile(_0xfilePath, 'utf-8');
    return _0xdata.split('\n').map(_0xline => _0xline.trim()).filter(_0xline => _0xline);
  } catch (_0xerror) {
    console.error(_0xdecrypt('RXJyb3IgcmVhZGluZyBmaWxlOg=='), _0xerror.message);
    return [];
  }
}

function _0xshowWelcome() {
  console.log(`
  ${'████████╗███████╗███╗   ██╗███████╗ ██████╗'.blue.bold}
  ${'╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔═══██╗'.blue.bold}
  ${'   ██║   █████╗  ██╔██╗ ██║█████╗  ██║   ██║'.blue.bold}
  ${'   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██║   ██║'.blue.bold}
  ${'   ██║   ███████╗██║ ╚████║███████╗╚██████╔╝'.blue.bold}
  ${'   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝'.blue.bold}
  
  ${_0xdecrypt('QVVUTyBQSU5HIEJPUA==').green.bold}
  ${_0xstrings.telegram.yellow.bold}
  `);
}

async function _0xselectProxyOption() {
  const _0xrl = _0x9aij.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((_0xresolve) => {
    console.log(`${_0xdecrypt('UHJveHkgT3B0aW9uczo=').yellow.bold}`);
    console.log(`${'1.'.green.bold} ${_0xdecrypt('VXNlIE1vbm9zYW5zIFByb3h5').cyan}`);
    console.log(`${'2.'.green.bold} ${_0xdecrypt('VXNlIFByaXZhdGUgUHJveHk=').cyan}`);
    console.log(`${'3.'.green.bold} ${_0xdecrypt('Tm8gUHJveHk=').cyan}`);
    _0xrl.question(`${_0xdecrypt('U2VsZWN0IG9wdGlvbiBbMS8yLzNdOg==')}`.yellow.bold, (_0xanswer) => {
      _0xrl.close();
      const _0xchoice = parseInt(_0xanswer.trim());
      if ([1, 2, 3].includes(_0xchoice)) {
        const _0xproxyType = _0xchoice === 1 ? _0xdecrypt('TW9ub3NhbnMgUHJveHk=') :
                            _0xchoice === 2 ? _0xdecrypt('UHJpdmF0ZSBQcm94eQ==') : _0xdecrypt('Tm8gUHJveHk=');
        console.log(`${_0xdecrypt('4pyVIFNlbGVjdGVkOg==')} ${_0xproxyType}`.green.bold);
        _0xresolve(_0xchoice);
      } else {
        console.log(`${_0xdecrypt('4pyXSW52YWxpZCBvcHRpb24uIENob29zZSAxLCAyIG9yIDM=')}`.red.bold);
        process.exit(1);
      }
    });
  });
}

async function _0xdownloadMonosansProxies() {
  try {
    console.log(`${_0xdecrypt('RG93bmxvYWRpbmcgTW9ub3NhbnMgcHJveGllcy4uLg==')}`.blue.bold);
    const _0xresponse = await _0xopqr.get(_0xstrings.proxyUrl);
    await _0x34cd.writeFile('proxies.txt', _0xresponse.data);
    console.log(`${_0xdecrypt('4pyVIE1vbm9zYW5zIHByb3hpZXMgZG93bmxvYWRlZCBzdWNjZXNzZnVsbHk=')}`.green.bold);
    return _0xresponse.data.split('\n').filter(_0xline => _0xline.trim());
  } catch (_0xerror) {
    console.log(`${_0xdecrypt('4pyXRmFpbGVkIHRvIGRvd25sb2FkIE1vbm9zYW5zIHByb3hpZXM6')}: ${_0xerror.message}`.red.bold);
    return [];
  }
}

async function _0xloadProxies(_0xchoice) {
  if (_0xchoice === 1) {
    return await _0xdownloadMonosansProxies();
  } else if (_0xchoice === 2) {
    try {
      const _0xdata = await _0x34cd.readFile('proxies.txt', 'utf-8');
      const _0xproxies = _0xdata.split('\n').filter(_0xline => _0xline.trim());
      if (_0xproxies.length === 0) {
        console.log(`${_0xdecrypt('4pyXTm8gcHJveGllcyBmb3VuZCBpbiBwcm94aWVzLnR4dA==')}`.red.bold);
        return [];
      }
      console.log(`${_0xdecrypt('4pyVUHJveGllcyBsb2FkZWQ6')} ${_0xproxies.length}`.green.bold);
      return _0xproxies;
    } catch (_0xerror) {
      console.log(`${_0xdecrypt('4pyXRmFpbGVkIHRvIGxvYWQgcHJveGllczo=')} ${_0xerror.message}`.red.bold);
      return [];
    }
  }
  return [];
}

class _0xWebSocketClient {
  constructor(_0xtoken, _0xproxy = null, _0xaccountIndex, _0xproxyIP) {
    this._0xtoken = _0xtoken;
    this._0xproxy = _0xproxy;
    this._0xproxyIp = _0xproxyIP;
    this._0xaccountIndex = _0xaccountIndex;
    this._0xsocket = null;
    this._0xpingInterval = null;
    this._0xreconnectAttempts = 0;
    this._0xwsUrl = _0xstrings.wsUrl;
    this._0xversion = 'v0.2';
  }

  _0xgetCurrentTime() {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  _0xlog(_0xmessage, _0xstatus = 'info') {
    const _0xtimePrefix = `╭─[${this._0xgetCurrentTime()}]`.cyan.bold;
    const _0xaccountPrefix = `╰──▶ Account ${this._0xaccountIndex + 1}`.cyan.bold;
    const _0xproxyInfo = this._0xproxyIp ? ` | Proxy: ${this._0xproxyIp}` : '';
    let _0xstatusColor;
    switch (_0xstatus) {
      case 'success':
        _0xstatusColor = _0xmessage.green.bold;
        break;
      case 'error':
        _0xstatusColor = _0xmessage.red.bold;
        break;
      case 'warning':
        _0xstatusColor = _0xmessage.yellow.bold;
        break;
      default:
        _0xstatusColor = _0xmessage.blue.bold;
    }
    console.log(`${_0xtimePrefix}\n${_0xaccountPrefix}${_0xproxyInfo} | ${_0xstatusColor}`);
  }

  async _0xconnect() {
    const _0xwsUrl = `${this._0xwsUrl}/websocket?accessToken=${encodeURIComponent(this._0xtoken)}&version=${encodeURIComponent(this._0xversion)}`;
    const _0xoptions = {
      headers: {
        host: _0xdecrypt('c2VjdXJlLndzLnRlbmVvLnBybw=='),
        origin: _0xdecrypt('Y2hyb21lLWV4dGVuc2lvbjovL2VtY2NsY29hZ2xnY3Bvb2duZmlnZ21obmhnYWJwcGtt'),
        'sec-websocket-key': _0xdecrypt('eG5BeE5kZ1pXdlhQd1gxMXhPbVRDUQ=='),
        'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits',
      },
    };
    if (this._0xproxy) {
      _0xoptions.agent = _0xgetProxyAgent(this._0xproxy);
    }
    this._0xsocket = new _0x12ab(_0xwsUrl, _0xoptions);

    this._0xsocket.onopen = () => {
      this._0xlog(_0xdecrypt('V2ViU29ja2V0IGNvbm5lY3RlZCBzdWNjZXNzZnVsbHk='), 'success');
      this._0xreconnectAttempts = 0;
      this._0xstartPinging();
    };

    this._0xsocket.onmessage = (_0xevent) => {
      const _0xdata = JSON.parse(_0xevent.data);
      const _0xmessage = `${_0xdecrypt('TWVzc2FnZTo=')} ${_0xdata?.message || _0xdecrypt('Tm8gbWVzc2FnZQ==')} | ${_0xdecrypt('UG9pbnRzOg==')} ${_0xdata?.pointsTotal || 0} | ${_0xdecrypt('V2FpdGluZyAxNSBtaW51dGVzIGZvciBuZXh0IHBpbmc=')}...`;
      this._0xlog(_0xmessage, 'success');
    };

    this._0xsocket.onclose = () => {
      this._0xlog(_0xdecrypt('V2ViU29ja2V0IGRpc2Nvbm5lY3RlZA=='), 'warning');
      this._0xstopPinging();
      this._0xreconnect();
    };

    this._0xsocket.onerror = (_0xerror) => {
      this._0xlog(`${_0xdecrypt('V2ViU29ja2V0IGVycm9yOg==')} ${_0xerror.message}`, 'error');
    };
  }

  _0xreconnect() {
    const _0xdelay = Math.min(1000 * 2 ** this._0xreconnectAttempts, 30000);
    this._0xlog(`${_0xdecrypt('UmVjb25uZWN0aW5nIGlu')} ${_0xdelay / 1000} ${_0xdecrypt('c2Vjb25kcy4uLg==')}...`);
    setTimeout(() => {
      this._0xreconnectAttempts++;
      this._0xconnect();
    }, _0xdelay);
  }

  _0xdisconnect() {
    if (this._0xsocket) {
      this._0xsocket.close();
      this._0xsocket = null;
      this._0xstopPinging();
    }
  }

  _0xstartPinging() {
    this._0xstopPinging();
    this._0xpingInterval = setInterval(() => {
      if (this._0xsocket && this._0xsocket.readyState === _0x12ab.OPEN) {
        this._0xsocket.send(JSON.stringify({ type: _0xdecrypt('UElORw==') }));
      }
    }, 10000);
  }

  _0xstopPinging() {
    if (this._0xpingInterval) {
      clearInterval(this._0xpingInterval);
      this._0xpingInterval = null;
    }
  }
}

async function _0xcheckProxyIP(_0xproxy) {
  try {
    const _0xproxyAgent = _0xgetProxyAgent(_0xproxy);
    const _0xresponse = await _0xopqr.get(_0xdecrypt('aHR0cHM6Ly9hcGkuaXBpZnkub3JnP2Zvcm1hdD1qc29u'), { httpsAgent: _0xproxyAgent });
    return _0xresponse.status === 200 ? _0xresponse.data.ip : null;
  } catch (_0xerror) {
    return null;
  }
}

async function _0xgetRef(_0xproxy, _0xtoken) {
  const _0xurl = `${_0xstrings.apiUrl}?page=1&limit=25`;
  let _0xconfig = { headers: _0xheaders(_0xtoken) };
  if (_0xproxy) {
    _0xconfig.httpsAgent = _0xgetProxyAgent(_0xproxy);
  }
  try {
    const _0xresponse = await _0xopqr.get(_0xurl, _0xconfig);
    return _0xresponse.data;
  } catch (_0xerror) {
    console.error(_0xdecrypt('RXJyb3I6'), _0xerror.response ? _0xerror.response.data : _0xerror.message);
    return null;
  }
}

async function _0xclaimRef(_0xproxy, _0xref, _0xtoken) {
  const _0xurl = _0xstrings.claimUrl;
  let _0xconfig = { headers: _0xheaders(_0xtoken) };
  if (_0xproxy) {
    _0xconfig.httpsAgent = _0xgetProxyAgent(_0xproxy);
  }
  try {
    const _0xresponse = await _0xopqr.post(_0xurl, { referralId: _0xref.id, all: false }, _0xconfig);
    return _0xresponse.data;
  } catch (_0xerror) {
    console.error(_0xdecrypt('RXJyb3I6'), _0xerror.response ? _0xerror.response.data : _0xerror.message);
    return null;
  }
}

async function _0xhandleRef(_0xaccountIndex, _0xproxy, _0xtoken) {
  const _0xresInfo = await _0xgetRef(_0xproxy, _0xtoken);
  if (_0xresInfo?.success) {
    const { unfiltered: _0xunfiltered } = _0xresInfo;
    const _0xtimePrefix = `╭─[${new Date().toLocaleTimeString()}]`.cyan.bold;
    const _0xaccountPrefix = `╰──▶ Account ${_0xaccountIndex + 1}`.cyan.bold;
    const _0xproxyInfo = _0xproxy ? ` | Proxy: ${_0xproxy}` : '';
    console.log(
      `${_0xtimePrefix}\n${_0xaccountPrefix}${_0xproxyInfo} | ` +
      `${_0xdecrypt('UmVmIHN1Y2Nlc3M6')} ${_0xunfiltered.stats.successfulReferralsAmount}`.blue.bold +
      ` | ${_0xdecrypt('UmVmIHBlbmRpbmc6')} ${_0xunfiltered.stats.pendingReferralsAmount}`.blue.bold +
      ` | ${_0xdecrypt('UG9pbnRzIHJlZjo=')} ${_0xunfiltered.stats.totalReferralPoints}`.blue.bold +
      ` | ${_0xdecrypt('Q2hlY2tpbmcgcmVmIHJld2FyZA==')}...`.blue.bold
    );
    const _0xrefClaims = _0xunfiltered.referrals.filter(_0xr => _0xr.canClaim);
    if (_0xrefClaims.length === 0) {
      console.log(`${_0xtimePrefix}\n${_0xaccountPrefix}${_0xproxyInfo} | ${_0xdecrypt('Tm8gcmV3YXJkcyByZWYgdG8gY2xhaW0=')}`.yellow.bold);
      return;
    }
    for (const _0xreferral of _0xrefClaims) {
      await new Promise(_0xresolve => setTimeout(_0xresolve, 1000));
      const _0xresClaim = await _0xclaimRef(_0xproxy, _0xreferral, _0xtoken);
      if (_0xresClaim?.success) {
        console.log(`${_0xtimePrefix}\n${_0xaccountPrefix}${_0xproxyInfo} | ${_0xdecrypt('Q2xhaW1lZCByZWZlcnJhbDo=')} ${_0xreferral.id} ${_0xdecrypt('c3VjY2Vzc2Z1bGx5')}`.green.bold);
      } else {
        console.log(`${_0xtimePrefix}\n${_0xaccountPrefix}${_0xproxyInfo} | ${_0xdecrypt('RmFpbGVkIHRvIGNsYWltIHJlZmVycmFsOg==')} ${_0xreferral.id}`.yellow.bold);
      }
    }
  }
}

async function _0xmain() {
  try {
    _0xshowWelcome();
    const _0xtknData = await _0x34cd.readFile('tokens.txt', 'utf-8');
    const _0xtkns = _0xtknData.split('\n').map(_0xline => _0xline.trim()).filter(Boolean);
    if (_0xtkns.length === 0) {
      console.log(`${_0xdecrypt('4pyXTm8gdG9rZW5zIGZvdW5kIGluIHRva2Vucy50eHQ=')}`.red.bold);
      process.exit(1);
    }
    const _0xproxyChoice = await _0xselectProxyOption();
    let _0xproxies = [];
    let _0xuseProxy = false;
    if (_0xproxyChoice === 1 || _0xproxyChoice === 2) {
      _0xuseProxy = true;
      _0xproxies = await _0xloadProxies(_0xproxyChoice);
      if (_0xproxies.length === 0) {
        console.log(`${_0xdecrypt('4pyXTm8gcHJveGllcyBhdmFpbGFibGUsIGNvbnRpbnVpbmcgd2l0aG91dCBwcm94eQ==')}`.yellow.bold);
        _0xuseProxy = false;
      }
    }
    const _0xwsClients = [];
    for (let _0xi = 0; _0xi < _0xtkns.length; _0xi++) {
      const _0xtoken = _0xtkns[_0xi];
      const _0xproxy = _0xuseProxy ? _0xproxies[_0xi % _0xproxies.length] : null;
      let _0xproxyIP = null;
      if (_0xproxy) {
        try {
          _0xproxyIP = await _0xcheckProxyIP(_0xproxy);
          if (!_0xproxyIP) {
            console.log(`${_0xdecrypt('4pyXQ2Fubm90IGNoZWNrIHByb3h5')} ${_0xproxy}, ${_0xdecrypt('c2tpcHBpbmc=')}...`.yellow.bold);
            continue;
          }
        } catch (_0xerror) {
          console.log(`${_0xdecrypt('4pyXUHJveHkgY2hlY2sgZmFpbGVkIGZvcg==')} ${_0xproxy}: ${_0xerror.message}, ${_0xdecrypt('c2tpcHBpbmc=')}...`.yellow.bold);
          continue;
        }
      }
      await _0xhandleRef(_0xi, _0xproxy, _0xtoken);
      console.log(`${_0xdecrypt('4pyVQ29ubmVjdGluZyBXZWJTb2NrZXQgZm9yIGFjY291bnQ=')} ${_0xi + 1}`.blue.bold +
                 ` ${_0xproxy ? `${_0xdecrypt('d2l0aCBwcm94eQ==')} ${_0xproxy}` : _0xdecrypt('d2l0aG91dCBwcm94eQ==')}`);
      const _0xwsClient = new _0xWebSocketClient(_0xtoken, _0xproxy, _0xi, _0xproxyIP);
      _0xwsClient._0xconnect();
      _0xwsClients.push(_0xwsClient);
      await new Promise(_0xresolve => setTimeout(_0xresolve, 1000));
    }
    process.on('SIGINT', () => {
      console.log(`${_0xdecrypt('4pyXUHJvZ3JhbSBleGl0ZWQuIFN0b3BwaW5nIGFsbCBXZWJTb2NrZXRzLi4u')}`.yellow.bold);
      _0xwsClients.forEach(_0xclient => {
        _0xclient._0xstopPinging();
        _0xclient._0xdisconnect();
      });
      process.exit(0);
    });
  } catch (_0xerror) {
    console.log(`${_0xdecrypt('4pyXRVJyb3IgaW4gbWFpbiBmdW5jdGlvbjo=')} ${_0xerror.message}`.red.bold);
    process.exit(1);
  }
}

_0xmain();