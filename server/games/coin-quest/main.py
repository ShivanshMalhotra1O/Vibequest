import pickle
from os import path
import pygame
from pygame.locals import *
import asyncio


class Button:
    def __init__(self, x, y, image):
        self.image = image
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.clicked = False

    def draw(self, screen):
        action = False

        # get mouse position
        pos = pygame.mouse.get_pos()

        # check mouseover and clicked conditions
        if self.rect.collidepoint(pos):
            if pygame.mouse.get_pressed()[0] == 1 and self.clicked is False:
                action = True
                self.clicked = True

        if pygame.mouse.get_pressed()[0] == 0:
            self.clicked = False

        # draw button
        screen.blit(self.image, self.rect)

        return action


class Player:
    def __init__(self, x, y, scale=1.0):
        """
        x, y: initial position (already scaled externally)
        scale: global scale factor to multiply all dimensions.
        """
        self.scale = scale
        self.reset(x, y)

    def update(
        self,
        game_over,
        world,
        blob_group,
        lava_group,
        exit_group,
        platform_group,
        screen,
        draw_text,
        font,
        blue,
        screen_width,
        screen_height,
    ):
        dx = 0
        dy = 0
        # Adjust speeds, thresholds, gravity, etc. by scale
        move_speed = 5 * self.scale
        jump_power = 15 * self.scale
        gravity = 1 * self.scale
        max_fall_speed = 10 * self.scale
        walk_cooldown = 5
        col_thresh = 20 * self.scale

        if game_over == 0:
            key = pygame.key.get_pressed()
            if key[pygame.K_SPACE] and not self.jumped and not self.in_air:
                self.vel_y = -jump_power
                self.jumped = True
            if not key[pygame.K_SPACE]:
                self.jumped = False
            if key[pygame.K_LEFT]:
                dx -= move_speed
                self.counter += 1
                self.direction = -1
            if key[pygame.K_RIGHT]:
                dx += move_speed
                self.counter += 1
                self.direction = 1
            if not key[pygame.K_LEFT] and not key[pygame.K_RIGHT]:
                self.counter = 0
                self.index = 0
                if self.direction == 1:
                    self.image = self.images_right[self.index]
                if self.direction == -1:
                    self.image = self.images_left[self.index]

            # handle animation
            if self.counter > walk_cooldown:
                self.counter = 0
                self.index += 1
                if self.index >= len(self.images_right):
                    self.index = 0
                if self.direction == 1:
                    self.image = self.images_right[self.index]
                if self.direction == -1:
                    self.image = self.images_left[self.index]

            # add gravity
            self.vel_y += gravity
            if self.vel_y > max_fall_speed:
                self.vel_y = max_fall_speed
            dy += self.vel_y

            # check for collision with the tile map
            self.in_air = True
            for tile in world.tile_list:
                # x collision
                if tile[1].colliderect(
                    self.rect.x + dx, self.rect.y, self.width, self.height
                ):
                    dx = 0
                # y collision
                if tile[1].colliderect(
                    self.rect.x, self.rect.y + dy, self.width, self.height
                ):
                    if self.vel_y < 0:
                        dy = tile[1].bottom - self.rect.top
                        self.vel_y = 0
                    elif self.vel_y >= 0:
                        dy = tile[1].top - self.rect.bottom
                        self.vel_y = 0
                        self.in_air = False

            # check collision with enemies
            if pygame.sprite.spritecollide(self, blob_group, False):
                game_over = -1

            # check collision with lava
            if pygame.sprite.spritecollide(self, lava_group, False):
                game_over = -1

            # check collision with exit
            if pygame.sprite.spritecollide(self, exit_group, False):
                game_over = 1

            # check collision with moving platforms
            for platform in platform_group:
                if platform.rect.colliderect(
                    self.rect.x + dx, self.rect.y, self.width, self.height
                ):
                    dx = 0
                if platform.rect.colliderect(
                    self.rect.x, self.rect.y + dy, self.width, self.height
                ):
                    # if below the platform
                    if abs((self.rect.top + dy) - platform.rect.bottom) < col_thresh:
                        self.vel_y = 0
                        dy = platform.rect.bottom - self.rect.top
                    # if above the platform
                    elif abs((self.rect.bottom + dy) - platform.rect.top) < col_thresh:
                        self.rect.bottom = platform.rect.top - 1
                        self.in_air = False
                        dy = 0
                    # move sideways with the platform
                    if platform.move_x != 0:
                        self.rect.x += platform.move_direction

            # update coordinates
            self.rect.x += dx
            self.rect.y += dy

        elif game_over == -1:
            self.image = self.dead_image
            draw_text(
                "GAME OVER!",
                font,
                blue,
                (screen_width // 2) - 155 * self.scale,
                screen_height // 2,
            )
            draw_text(
                "Restart to play again",
                font,
                blue,
                (screen_width // 2) - 240 * self.scale,
                screen_height // 2 + 50 * self.scale,
            )
            # small "float up" effect
            if self.rect.y > screen_height * 0.33:
                self.rect.y -= 5 * self.scale
            else:
                return 2

        screen.blit(self.image, self.rect)
        return game_over

    def reset(self, x, y):
        # Load and scale the images
        self.images_right = []
        self.images_left = []
        self.index = 0
        self.counter = 0
        for num in range(1, 5):
            img_right = pygame.image.load(f"assets/guy{num}.png").convert_alpha()
            # Scale image
            w, h = img_right.get_width(), img_right.get_height()
            factor = 0.45
            img_right = pygame.transform.scale(
                img_right, (int(self.scale * 30), int(self.scale * 60))
            )
            img_left = pygame.transform.flip(img_right, True, False)
            self.images_right.append(img_right)
            self.images_left.append(img_left)

        self.dead_image = pygame.image.load("assets/ghost.png").convert_alpha()
        w, h = self.dead_image.get_width(), self.dead_image.get_height()
        self.dead_image = pygame.transform.scale(
            self.dead_image, (int(w * self.scale), int(h * self.scale))
        )

        self.image = self.images_right[self.index]
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

        self.width = self.rect.width
        self.height = self.rect.height
        self.vel_y = 0
        self.jumped = False
        self.direction = 0
        self.in_air = True


class World:
    def __init__(
        self,
        data,
        tile_size,
        blob_group,
        lava_group,
        platform_group,
        coin_group,
        exit_group,
        scale=1.0,
    ):
        """
        data: 2D array for the level
        tile_size: base tile size (already scaled)
        scale: global scale factor
        """
        self.tile_list = []
        self.scale = scale

        # load images (un-scaled), then scale as needed
        dirt_img = pygame.image.load("assets/dirt.png").convert_alpha()
        grass_img = pygame.image.load("assets/grass.png").convert_alpha()

        row_count = 0
        for row in data:
            col_count = 0
            for tile in row:
                x_pos = col_count * tile_size
                y_pos = row_count * tile_size
                if tile == 1:
                    img = pygame.transform.scale(dirt_img, (tile_size, tile_size))
                    img_rect = img.get_rect()
                    img_rect.x = x_pos
                    img_rect.y = y_pos
                    self.tile_list.append((img, img_rect))

                elif tile == 2:
                    img = pygame.transform.scale(grass_img, (tile_size, tile_size))
                    img_rect = img.get_rect()
                    img_rect.x = x_pos
                    img_rect.y = y_pos
                    self.tile_list.append((img, img_rect))

                elif tile == 3:
                    blob = Enemy(x_pos, y_pos, self.scale)
                    blob_group.add(blob)

                elif tile == 4:
                    platform = Platform(x_pos, y_pos, 1, 0, tile_size, self.scale)
                    platform_group.add(platform)

                elif tile == 5:
                    platform = Platform(x_pos, y_pos, 0, 1, tile_size, self.scale)
                    platform_group.add(platform)

                elif tile == 6:
                    lava = Lava(x_pos, y_pos + (tile_size // 2), tile_size, self.scale)
                    lava_group.add(lava)

                elif tile == 7:
                    coin = Coin(
                        x_pos + (tile_size // 2),
                        y_pos + (tile_size // 2),
                        tile_size,
                        self.scale,
                    )
                    coin_group.add(coin)

                elif tile == 8:
                    exit_obj = Exit(
                        x_pos, y_pos - (tile_size // 2), tile_size, self.scale
                    )
                    exit_group.add(exit_obj)

                col_count += 1
            row_count += 1

    def draw(self, screen):
        for tile in self.tile_list:
            screen.blit(tile[0], tile[1])


class Enemy(pygame.sprite.Sprite):
    def __init__(self, x, y, scale=1.0):
        pygame.sprite.Sprite.__init__(self)
        self.scale = scale
        img = pygame.image.load("assets/blob.png").convert_alpha()
        w, h = img.get_width(), img.get_height()
        img = pygame.transform.scale(img, (int(w * scale), int(h * scale)))
        self.image = img
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

        self.move_direction = 1
        self.move_counter = 0
        self.move_range = 50 * scale  # how far the enemy moves before reversing

    def update(self):
        self.rect.x += self.move_direction
        self.move_counter += 1
        # Use scaled movement range
        if abs(self.move_counter) > self.move_range:
            self.move_direction *= -1
            self.move_counter *= -1


class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, move_x, move_y, tile_size, scale=1.0):
        pygame.sprite.Sprite.__init__(self)
        self.scale = scale
        img = pygame.image.load("assets/platform.png").convert_alpha()
        # Scale the platform
        w, h = img.get_width(), img.get_height()
        # The original code did tile_size × tile_size//2, so let's keep that logic but scaled
        self.image = pygame.transform.scale(img, (tile_size, tile_size // 2))
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

        self.move_counter = 0
        self.move_direction = 1
        self.move_x = move_x
        self.move_y = move_y
        # Determine how far the platform moves before reversing
        self.move_range = 50 * scale

    def update(self):
        self.rect.x += self.move_direction * self.move_x
        self.rect.y += self.move_direction * self.move_y
        self.move_counter += 1
        if abs(self.move_counter) > self.move_range:
            self.move_direction *= -1
            self.move_counter *= -1


class Lava(pygame.sprite.Sprite):
    def __init__(self, x, y, tile_size, scale=1.0):
        pygame.sprite.Sprite.__init__(self)
        img = pygame.image.load("assets/lava.png").convert_alpha()
        w, h = img.get_width(), img.get_height()
        # The original code uses tile_size × tile_size//2
        self.image = pygame.transform.scale(img, (tile_size, tile_size // 2))
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y


class Coin(pygame.sprite.Sprite):
    def __init__(self, x, y, tile_size, scale=1.0):
        pygame.sprite.Sprite.__init__(self)
        img = pygame.image.load("assets/coin.png").convert_alpha()
        w, h = img.get_width(), img.get_height()
        # original code: (tile_size // 2, tile_size // 2)
        coin_size = tile_size // 2
        self.image = pygame.transform.scale(img, (coin_size, coin_size))
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)


class Exit(pygame.sprite.Sprite):
    def __init__(self, x, y, tile_size, scale=1.0):
        pygame.sprite.Sprite.__init__(self)
        img = pygame.image.load("assets/exit.png").convert_alpha()
        w, h = img.get_width(), img.get_height()
        # original code: scale to (tile_size, tile_size * 1.5)
        self.image = pygame.transform.scale(img, (tile_size, int(tile_size * 1.5)))
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y


class Game:
    def __init__(self):
        pygame.init()
        self.speed = int(pyodide.globals.get("speed"))
        self.canvas = pyodide.globals.get("canvas")
        self.width, self.height = self.canvas.width, self.canvas.height
        # self.speed = 60
        # self.width, self.height = 600, 600

        self.min_val = min(self.width, self.height)
        self.screen_width, self.screen_height = self.min_val, self.min_val
        self.SCALE = self.min_val / 600.0

        # Create a pygame Surface with our scaled size
        self.screen = pygame.display.set_mode(
            (int(self.screen_width), int(self.screen_height))
        )
        pygame.display.set_caption("Platformer")

        # Clock and font
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("Bauhaus 93", int(70 * self.SCALE))
        self.font_score = pygame.font.SysFont("Bauhaus 93", int(30 * self.SCALE))

        # Scale tile size
        self.base_tile_size = 30
        self.tile_size = int(self.base_tile_size * self.SCALE)

        self.game_over = 0
        self.main_menu = True
        self.level = 0
        self.max_levels = 1
        self.score = 0

        # Colors
        self.black = (0, 0, 0)
        self.blue = (0, 0, 255)

        # Load images (scaled)
        sun_img_orig = pygame.image.load("assets/sun.png").convert_alpha()
        w, h = sun_img_orig.get_width(), sun_img_orig.get_height()
        self.sun_img = pygame.transform.scale(
            sun_img_orig, (int(w * self.SCALE), int(h * self.SCALE))
        )

        bg_img_orig = pygame.image.load("assets/sky.png").convert_alpha()
        w, h = bg_img_orig.get_width(), bg_img_orig.get_height()
        # You can choose how to scale the background
        self.bg_img = pygame.transform.scale(
            bg_img_orig,
            (
                int(w * (self.screen_width / 600.0)),
                int(h * (self.screen_height / 600.0)),
            ),
        )

        start_img_orig = pygame.image.load("assets/start_btn.png").convert_alpha()
        w, h = start_img_orig.get_width(), start_img_orig.get_height()
        self.start_img = pygame.transform.scale(
            start_img_orig, (int(w * self.SCALE), int(h * self.SCALE))
        )

        # Initialize Player and groups
        # Notice we scale the player's starting position too
        self.player = Player(
            100 * self.SCALE, self.screen_height - 130 * self.SCALE, scale=self.SCALE
        )

        self.blob_group = pygame.sprite.Group()
        self.lava_group = pygame.sprite.Group()
        self.platform_group = pygame.sprite.Group()
        self.coin_group = pygame.sprite.Group()
        self.exit_group = pygame.sprite.Group()

        # Dummy coin for the score
        score_coin = Coin(
            self.tile_size // 2, self.tile_size // 2, self.tile_size, self.SCALE
        )
        self.coin_group.add(score_coin)

        # Load level data
        if path.exists(f"assets/level{self.level}_data"):
            with open(f"assets/level{self.level}_data", "rb") as f:
                self.world_data = pickle.load(f)
            self.world = World(
                self.world_data,
                self.tile_size,
                self.blob_group,
                self.lava_group,
                self.platform_group,
                self.coin_group,
                self.exit_group,
                scale=self.SCALE,
            )

        # Button
        # Position the button in the center, but scaled
        self.start_button = Button(
            (self.screen_width // 2) - (int(150 * self.SCALE)),
            (self.screen_height // 2),
            self.start_img,
        )

    def reset_level(self):
        # Re-init player & groups
        self.player.reset(100 * self.SCALE, self.screen_height - 130 * self.SCALE)
        self.blob_group.empty()
        self.platform_group.empty()
        self.coin_group.empty()
        self.lava_group.empty()
        self.exit_group.empty()

        if path.exists(f"assets/level{self.level}_data"):
            with open(f"assets/level{self.level}_data", "rb") as f:
                world_data = pickle.load(f)
            self.world = World(
                world_data,
                self.tile_size,
                self.blob_group,
                self.lava_group,
                self.platform_group,
                self.coin_group,
                self.exit_group,
                scale=self.SCALE,
            )

    def draw_text(self, text, font, color, x, y):
        img = font.render(text, True, color)
        self.screen.blit(img, (x, y))

    async def main(self):
        running = True
        while running:
            self.clock.tick(self.speed)
            # draw background
            self.screen.blit(self.bg_img, (0, 0))
            self.screen.blit(self.sun_img, (100 * self.SCALE, 100 * self.SCALE))

            if self.main_menu:
                if self.start_button.draw(self.screen):
                    self.main_menu = False
            else:
                self.world.draw(self.screen)

                if self.game_over == 0:
                    self.blob_group.update()
                    # check for coin collision
                    if pygame.sprite.spritecollide(self.player, self.coin_group, True):
                        self.score += 1
                    # show score
                    self.draw_text(
                        f"X {self.score}",
                        self.font_score,
                        self.black,
                        10 * self.SCALE,
                        10 * self.SCALE,
                    )

                # draw sprite groups
                self.blob_group.draw(self.screen)
                self.platform_group.draw(self.screen)
                self.lava_group.draw(self.screen)
                self.coin_group.draw(self.screen)
                self.exit_group.draw(self.screen)

                # update player
                self.game_over = self.player.update(
                    self.game_over,
                    self.world,
                    self.blob_group,
                    self.lava_group,
                    self.exit_group,
                    self.platform_group,
                    self.screen,
                    self.draw_text,
                    self.font,
                    self.blue,
                    self.screen_width,
                    self.screen_height,
                )

                if self.game_over == 2:
                    pyodide.globals.get("setGameStatus")("STOPPED")
                    pygame.display.update()
                    await asyncio.sleep(0)
                    return

                if self.game_over == 1:
                    self.level += 1
                    if self.level <= self.max_levels:
                        self.reset_level()
                        self.game_over = 0
                    else:
                        self.draw_text(
                            "YOU WIN!",
                            self.font,
                            self.blue,
                            190 * self.SCALE,
                            300 * self.SCALE,
                        )
                        pyodide.globals.get("setGameStatus")("STOPPED")
                        pygame.display.update()
                        await asyncio.sleep(0.1)
                        return

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False

            pygame.display.update()
            # allow other coroutines to run
            await asyncio.sleep(0)


game = Game()


async def exit_game():
    pygame.quit()


async def main():
    await game.main()


main()
# asyncio.run(main())
