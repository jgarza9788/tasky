const electron = require('electron');
const {app, BrowserWindow,Tray} = electron;

const path = require('path');

let mainWindow;
let tray;

app.on ('ready',()=>{
    mainWindow  = new BrowserWindow({
        width: 300,
        height: 500,
        frame: false,
        resizable: false,
        show: false,
    });
    

    mainWindow.loadURL('file://' + __dirname + '/src/index.html');

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname,`./src/assets/${iconName}`);
    // const iconPath = __dirname + '/src/assets/' + iconName;

    console.log(iconPath);

    tray = new Tray(iconPath);
    tray.on('click',(event,bounds)=>{

        console.log(bounds.x);
        console.log(bounds.y);

        const {x,y} = bounds;
        const {width, height} = mainWindow.getBounds();
        const screenWidth = electron.screen.getPrimaryDisplay().workAreaSize.width;
        const screenHeight = electron.screen.getPrimaryDisplay().workAreaSize.height;

        console.log(screenWidth);

        var nY = y == 0 ? y : y - height;
        if (process.platform === 'win32' && nY === 0)
        {
            nY += 50;
        }

        var nX = 0;
        if (x < (width/2))
        {
            nX = 100;
        }
        else if ( screenWidth < x + (width/2) )
        {
            nX = x - width - 25 ;
        }
        else
        {
            nX = x -(width/2);
        }

        console.log(nX);
        console.log(nY);

        if(mainWindow.isVisible())
        {
            mainWindow.hide();
        }
        else
        {
            mainWindow.setBounds({
                x: parseInt(nX),
                y: parseInt(nY),
                //y: process.platform === 'darwin' ? y:y - height,
                width: width,
                height: height,
            });
            mainWindow.show();
        }
    });
});