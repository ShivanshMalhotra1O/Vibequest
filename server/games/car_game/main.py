import pygame
from pygame.locals import *
import random
import asyncio


class CarGame:
    def __init__(self):
        pygame.font.init()
        self.speed = pyodide.globals.get("speed")
        canvas = pyodide.globals.get("canvas")
        self.width, self.height = canvas.width, canvas.height
        self.min_value = min(self.width, self.height)
        self.scaling_factor = self.min_value / 500.0
        self.screen = pygame.display.set_mode((self.min_value, self.min_value))
        pygame.display.set_caption("Car Game")

        self.gray = (100, 100, 100)
        self.green = (76, 208, 56)
        self.red = (200, 0, 0)
        self.white = (255, 255, 255)
        self.yellow = (255, 232, 0)

        self.road_width = int(300 * self.scaling_factor)
        self.marker_width = int(10 * self.scaling_factor)
        self.marker_height = int(50 * self.scaling_factor)

        self.left_lane = int(150 * self.scaling_factor)
        self.center_lane = int(250 * self.scaling_factor)
        self.right_lane = int(350 * self.scaling_factor)
        self.lanes = [self.left_lane, self.center_lane, self.right_lane]

        self.road = (int(100 * self.scaling_factor), 0, self.road_width, self.height)
        self.left_edge_marker = (
            int(95 * self.scaling_factor),
            0,
            self.marker_width,
            self.height,
        )
        self.right_edge_marker = (
            int(395 * self.scaling_factor),
            0,
            self.marker_width,
            self.height,
        )

        self.lane_marker_move_y = 0

        self.player_x = int(250 * self.scaling_factor)
        self.player_y = int(400 * self.scaling_factor)

        self.clock = pygame.time.Clock()
        self.fps = self.speed

        self.gameover = False
        self.speed = 2
        self.score = 0

        self.player_group = pygame.sprite.Group()
        self.vehicle_group = pygame.sprite.Group()

        self.image_filenames = [
            "pickup_truck.png",
            "semi_trailer.png",
            "taxi.png",
            "van.png",
        ]
        self.vehicle_images = [
            pygame.image.load("images/" + img) for img in self.image_filenames
        ]

        self.crash = pygame.image.load("images/crash.png")
        crash_scale = self.scaling_factor
        crash_width = int(self.crash.get_width() * crash_scale)
        crash_height = int(self.crash.get_height() * crash_scale)
        self.crash = pygame.transform.scale(self.crash, (crash_width, crash_height))
        self.crash_rect = self.crash.get_rect()

        self.player = PlayerVehicle(self.player_x, self.player_y, self.scaling_factor)
        self.player_group.add(self.player)


class Vehicle(pygame.sprite.Sprite):
    def __init__(self, image, x, y, scaling_factor):
        pygame.sprite.Sprite.__init__(self)
        image_scale = (45 * scaling_factor) / image.get_rect().width
        new_width = int(image.get_rect().width * image_scale)
        new_height = int(image.get_rect().height * image_scale)
        self.image = pygame.transform.scale(image, (new_width, new_height))
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]


class PlayerVehicle(Vehicle):
    def __init__(self, x, y, scaling_factor):
        image = pygame.image.load("images/car.png")
        super().__init__(image, x, y, scaling_factor)


game = CarGame()


async def main():
    running = True
    while running:
        game.clock.tick(game.fps)

        for event in pygame.event.get():
            if event.type == QUIT:
                running = False

            if event.type == KEYDOWN:
                if event.key == K_LEFT and game.player.rect.center[0] > game.left_lane:
                    game.player.rect.x -= int(100 * game.scaling_factor)
                elif (
                    event.key == K_RIGHT
                    and game.player.rect.center[0] < game.right_lane
                ):
                    game.player.rect.x += int(100 * game.scaling_factor)

                for vehicle in game.vehicle_group:
                    if pygame.sprite.collide_rect(game.player, vehicle):
                        game.gameover = True
                        if event.key == K_LEFT:
                            game.player.rect.left = vehicle.rect.right
                            game.crash_rect.center = [
                                game.player.rect.left,
                                (game.player.rect.center[1] + vehicle.rect.center[1])
                                / 2,
                            ]
                        elif event.key == K_RIGHT:
                            game.player.rect.right = vehicle.rect.left
                            game.crash_rect.center = [
                                game.player.rect.right,
                                (game.player.rect.center[1] + vehicle.rect.center[1])
                                / 2,
                            ]

        game.screen.fill(game.green)
        pygame.draw.rect(game.screen, game.gray, game.road)
        pygame.draw.rect(game.screen, game.yellow, game.left_edge_marker)
        pygame.draw.rect(game.screen, game.yellow, game.right_edge_marker)

        game.lane_marker_move_y += game.speed * 2
        if game.lane_marker_move_y >= game.marker_height * 2:
            game.lane_marker_move_y = 0
        for y in range(game.marker_height * -2, game.height, game.marker_height * 2):
            pygame.draw.rect(
                game.screen,
                game.white,
                (
                    game.left_lane + int(45 * game.scaling_factor),
                    y + game.lane_marker_move_y,
                    game.marker_width,
                    game.marker_height,
                ),
            )
            pygame.draw.rect(
                game.screen,
                game.white,
                (
                    game.center_lane + int(45 * game.scaling_factor),
                    y + game.lane_marker_move_y,
                    game.marker_width,
                    game.marker_height,
                ),
            )

        game.player_group.draw(game.screen)

        if len(game.vehicle_group) < 2:
            add_vehicle = all(
                vehicle.rect.top >= vehicle.rect.height * 1.5
                for vehicle in game.vehicle_group
            )
            if add_vehicle:
                lane = random.choice(game.lanes)
                image = random.choice(game.vehicle_images)
                vehicle = Vehicle(image, lane, game.height / -2, game.scaling_factor)
                game.vehicle_group.add(vehicle)

        for vehicle in game.vehicle_group:
            vehicle.rect.y += game.speed
            if vehicle.rect.top >= game.height:
                vehicle.kill()
                game.score += 1
                if game.score > 0 and game.score % 5 == 0:
                    game.speed += 1

        game.vehicle_group.draw(game.screen)

        font = pygame.font.Font(
            pygame.font.get_default_font(), int(16 * game.scaling_factor)
        )
        text = font.render("Score: " + str(game.score), True, game.white)
        text_rect = text.get_rect()
        text_rect.center = (
            int(50 * game.scaling_factor),
            int(400 * game.scaling_factor),
        )
        game.screen.blit(text, text_rect)

        if pygame.sprite.spritecollide(game.player, game.vehicle_group, True):
            game.gameover = True
            game.crash_rect.center = [game.player.rect.center[0], game.player.rect.top]

        if game.gameover:
            game.screen.blit(game.crash, game.crash_rect)
            pygame.draw.rect(
                game.screen,
                game.red,
                (
                    0,
                    int(50 * game.scaling_factor),
                    game.width,
                    int(100 * game.scaling_factor),
                ),
            )
            text = font.render("Game over", True, game.white)
            text_rect = text.get_rect()
            text_rect.center = (game.width / 2, int(100 * game.scaling_factor))
            game.screen.blit(text, text_rect)
            text = font.render("Restart to play again", True, game.white)
            text_rect = text.get_rect()
            text_rect.center = (game.width / 2, int(120 * game.scaling_factor))
            game.screen.blit(text, text_rect)
            pygame.display.update()
            await asyncio.sleep(0)
            return

        pygame.display.update()
        await asyncio.sleep(0)


async def exit_game():
    pygame.quit()


main()
