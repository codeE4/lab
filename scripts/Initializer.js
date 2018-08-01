const fs = require('fs')

class Initializer {
  constructor(project, container) {
    this.project = project
    this.container = container
  }

  exec() {
    const shell = require(`${this.project.photonPath}/node_modules/shelljs`)
    console.log(`${this.container.name} Initializer`)

    let initScript = `#!/bin/bash
# TODO: add any initialization commands here
`

    let initScriptFileName = `.container-init`

    fs.writeFileSync(initScriptFileName, initScript)

    shell.chmod('755', initScriptFileName)

    shell.exec(`lxc file push ${initScriptFileName} ${this.container.name}/root/${initScriptFileName}`)

    shell.exec(`lxc exec ${this.container.name} -- /root/${initScriptFileName}`)
  }
}

module.exports = Initializer
