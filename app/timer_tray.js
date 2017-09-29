const electron = require('electron');
const {Tray,app,Menu} = electron;

class TimerTray extends Tray
{
    constructor(iconPath, mainWindow)
    {
        super(iconPath);

        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.on('right-click',this.onRightClick.bind(this));
        this.setToolTip("TimerApp!");
    }

    onClick(event,bounds)
    {

        console.log(bounds.x);
        console.log(bounds.y);

        const {x,y} = bounds;
        const {width, height} = this.mainWindow.getBounds();
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

        if(this.mainWindow.isVisible())
        {
            this.mainWindow.hide();
        }
        else
        {
            this.mainWindow.setBounds({
                x: parseInt(nX),
                y: parseInt(nY),
                //y: process.platform === 'darwin' ? y:y - height,
                width: width,
                height: height,
            });
            this.mainWindow.show();
        }
    }

    onRightClick()
    {
        const menuConfig = Menu.buildFromTemplate
        ([
            {
                label: 'Quit',
                click: ()=> app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }


}




module.exports = TimerTray;