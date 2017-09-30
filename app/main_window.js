const electron = require('electron');
const {BrowserWindow} = electron;

class MainWindow extends BrowserWindow
{

    constructor(url)
    {
        super({
            width: 300,
            height: 500,
            frame: false,
            resizable: false,
            show: false,
            skipTaskbar: true, //don't show up on taskbar/dock
            webPreferences:{backgroundThrottling: false}
        });

        this.loadURL(url);
        this.on('blur',this.onBlur.bind(this));

        //new code
        this.blurTime = Date.now();
        console.log(this.blurTime);
    }


    onBlur()
    {   
        //now code
        this.blurTime = Date.now();
        this.hide();
    }

}

module.exports = MainWindow;