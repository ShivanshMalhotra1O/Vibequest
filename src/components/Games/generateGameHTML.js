/**
 *
 * @param {string} gameName
 * @param {string} gameTitle
 * @returns {string}
 */
export function generateGameHTML(gameName, gameTitle) {
	return `<html lang="en-us"><script src="https://pygame-web.github.io/archives/0.8/pythons.js" type=module id="site" data-python="cpython3.11" data-os="vtx,fs,snd,gui" async defer>
#<!--# screen pixels (real, hardware)
WIDTH=1024  # 1280
HEIGHT=600  # 720

# reference/idealized screen pixels
REFX = 1980
REFY = 1080

def u(real, ref, v):
    if abs(v) < 0.9999999:
        result = int( (float(real)/100.0) * (v*1000))
        if v<0:
            return real-result
        return result
    return int( (real/ref) * v )

def ux(*argv):
    global WIDTH, REFX
    acc = 0
    for v in argv:
        acc += u(WIDTH, REFX, v)
    return acc

def uy(*argv):
    global HEIGHT, REFY
    acc = 0
    for v in argv:
        acc += u(HEIGHT, REFY, v)
    return acc

# do not rename
async def custom_site():
    import sys
    import asyncio
    import platform
    import json
    from pathlib import Path
    import embed
    import pygame

    def compose():
        pygame.display.update()
        window.chromakey(None, *screen.get_colorkey(), 40)

    pygame.init()
    pygame.font.init()

    screen = pygame.display.set_mode([ux(.100),uy(.100)], pygame.SRCALPHA, 32)
    screen.set_colorkey( (0,0,0,0), pygame.RLEACCEL )
    screen.fill( (0,0,0,0) )

    compose()

    platform.window.canvas.style.visibility = "visible"
    apk = "${gameName}.apk"
    bundle = "${gameName}"

    # the C or js loader could do that but be explicit.
    appdir = Path(f"/data/data/{bundle}") # /data/data/${gameName}
    appdir.mkdir()

    # mount apk
    cfg = {
        "io": "url",
        "type":"mount",
        "mount" : {
            "point" : appdir.as_posix(),
            "path" : "/",
        },
        "path" : f"/ => {appdir.as_posix()}",
    }

    track = platform.window.MM.prepare(apk, json.dumps(cfg))

    marginx = ux(.020) # 20%
    marginy = uy(.045) # 45%


    def pg_bar(pos):
        nonlocal marginx, marginy
        # resolution of progress bar, recalculate since it may not be know yet.
        total = track.len or 10  # avoid div0
        slot = ux(.060)/ total # 60%

        pygame.draw.rect(screen,(10,10,10),( marginx-ux(10), marginy-uy(10), (total*slot)+ux(20), uy(110) ) )
        pygame.draw.rect(screen,(0,255,0), ( marginx, marginy, track.pos*slot, uy(90)) )

    # wait until zip mount + overlayfs is complete
    while not track.ready:
        pg_bar(track.pos)
        compose()
        await asyncio.sleep(.1)

    # fill it up in case it was cached and instant download
    pg_bar(track.len)
    compose()


    # preloader will change dir and prepend it to sys.path
    platform.run_main(PyConfig, loaderhome= appdir / "assets", loadermain=None)


    # wait preloading complete
    # that includes images and wasm compilation of bundled modules
    while embed.counter()<0:
        await asyncio.sleep(.1)

    main = appdir / "assets" / "main.py"

    # start async top level machinery and add a console.
    await TopLevel_async_handler.start_toplevel(platform.shell, console=window.python.config.debug)

    # now that apk is mounted we have access to font cache
    # but we need to fill __file__ that is not yet set
    __import__(__name__).__file__ = str(main)


    # now make a prompt
    fnt = pygame.sysfont.SysFont("freesans",  uy(80) )

    def ui_callback(pkg, error=None):
        nonlocal fnt
        if error:
            prompt = fnt.render(f"{error}", True, "black")
        else:
            prompt = fnt.render(f"Setting [{pkg}] up", True, "black")
        pg_bar(track.len)
        screen.blit(prompt, ( marginx+ ux(80), marginy - uy(10) ) )
        compose()

    # test/wait if user media interaction required
    if not platform.window.MM.UME:
        # now make a prompt
        fnt = pygame.sysfont.SysFont("freesans",  uy(80) )
        prompt = fnt.render("Ready to start !", True, "blue")
        pg_bar(track.len)
        screen.blit(prompt, ( marginx+ ux(80), marginy - uy(10) ) )
        compose()
        while not platform.window.MM.UME:
            await asyncio.sleep(.1)

    # cleanup
    screen.fill( (0,0,0,0) )
    pygame.display.flip()

    await shell.runpy(main, callback=ui_callback)

import asyncio
asyncio.run(custom_site())



#--></script>
<head>
    <script type="application/javascript">
config = {
    xtermjs : "1" ,
    _sdl2 : "canvas",
    user_canvas : 0,
    user_canvas_managed : 0,
    ume_block : 1,
    can_close : 0,
    archive : "${gameName}",
    gui_debug : 3,
    cdn : "https://pygame-web.github.io/archives/0.8/",
    autorun : 0,
    PYBUILD : "3.11"
}

</script>

    <title>${gameTitle}</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="height=device-height, initial-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <link rel="prefetch" href="https://pygame-web.github.io/archives/0.8/pythonrc.py">
    <link rel="prefetch" href="https://pygame-web.github.io/archives/0.8/vt/xterm.js">
    <link rel="prefetch" href="https://pygame-web.github.io/archives/0.8/vt/xterm-addon-image.js">
    <link rel="prefetch" href="https://pygame-web.github.io/archives/0.8/vt/xterm-addon-image.js">
    <link rel="icon" type="image/png" href="favicon.png" sizes="16x16">
    <script src="https://pygame-web.github.io/archives/0.8//browserfs.min.js"></script>

</head>

<body>
    <style>
        .framed{
            border: 0;
        }
    </style>

    <canvas class="emscripten" id="canvas" width="1px" height="1px" oncontextmenu="event.preventDefault()" tabindex=1></canvas>
   
    <iframe
        class="framed"
        sandbox="allow-same-origin allow-top-navigation allow-scripts allow-pointer-lock"
        allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; xr-spatial-tracking; gamepad; gyroscope; accelerometer; cross-origin-isolated"
        src="https://pygame-web.github.io/archives/0.8/empty.html"
    ></iframe>

</body>
</html>
`;
}
