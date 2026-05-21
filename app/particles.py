"""Enhanced floating spirit particles with trails."""
import math
import random
import tkinter as tk
from app.theme import PARTICLE_COLORS


class _Spirit:
    """A spirit particle with a trail of fading copies."""
    __slots__ = ("x", "y", "vx", "vy", "size", "r", "g", "b", "life", "max_life",
                 "phase", "speed_var", "canvas_ids", "trail_len")

    def __init__(self, w, h, spawn_rand=False):
        self.canvas_ids: list = []
        self._init(w, h, spawn_rand)

    def _init(self, w, h, rand=False):
        self.x = random.uniform(0, w)
        self.y = random.uniform(h * 0.5, h + 20) if not rand else random.uniform(0, h)
        angle = random.uniform(math.pi * 1.1, math.pi * 1.9)  # mostly upward
        speed = random.uniform(0.4, 1.2)
        self.vx = math.cos(angle) * speed * 0.3
        self.vy = -abs(math.sin(angle)) * speed
        self.size = random.uniform(1.5, 4.0)
        r, g, b = random.choice(PARTICLE_COLORS)
        self.r, self.g, self.b = r, g, b
        self.max_life = random.randint(100, 260)
        self.life = random.randint(0, self.max_life) if rand else self.max_life
        self.phase = random.uniform(0, math.pi * 2)
        self.speed_var = random.uniform(0.8, 1.2)
        self.trail_len = random.randint(3, 6)

    def reset(self, w, h):
        self._init(w, h, rand=False)

    def update(self) -> bool:
        self.life -= 1
        t = (self.max_life - self.life) * 0.04
        self.x += self.vx + math.sin(self.phase + t) * 0.4 * self.speed_var
        self.y += self.vy * self.speed_var
        return self.life > 0

    def alpha(self) -> float:
        t = self.life / self.max_life
        return math.sin(math.pi * (1.0 - t))

    def color(self, alpha_mult=1.0) -> str:
        a = max(0.0, min(1.0, self.alpha() * alpha_mult))
        return f"#{int(self.r*a):02x}{int(self.g*a):02x}{int(self.b*a):02x}"


class ParticleSystem:
    def __init__(self, canvas: tk.Canvas, count: int = 80, fps: int = 30):
        self.canvas = canvas
        self.count  = count
        self.delay  = max(16, 1000 // fps)
        self.running = True
        self.w = 800
        self.h = 600
        self._spirits: list = []
        self._spawned = False
        canvas.bind("<Configure>", self._on_resize, add="+")
        self._tick()

    def _on_resize(self, e):
        self.w, self.h = e.width, e.height
        if not self._spawned and e.width > 1 and e.height > 1:
            self._spawn_all()
            self._spawned = True

    def _spawn_all(self):
        for _ in range(self.count):
            s = _Spirit(self.w, self.h, spawn_rand=True)
            # Create trail ovals
            for j in range(s.trail_len):
                oid = self.canvas.create_oval(
                    s.x - s.size, s.y - s.size,
                    s.x + s.size, s.y + s.size,
                    fill=s.color(1.0 - j / s.trail_len),
                    outline="", tags="particle",
                )
                s.canvas_ids.append(oid)
            self._spirits.append(s)

    def _tick(self):
        if not self.running:
            return
        w, h = self.w, self.h
        for s in self._spirits:
            alive = s.update()
            if not alive or s.y < -s.size * 2:
                s.reset(w, h)
            # Update trail positions
            for j, oid in enumerate(s.canvas_ids):
                trail_alpha = 1.0 - j / len(s.canvas_ids)
                fade = trail_alpha ** 1.5
                # Offset trail behind movement direction
                trail_x = s.x + s.vx * j * 0.8
                trail_y = s.y + (-s.vy) * j * (-1.2)
                sz = s.size * (1.0 - j * 0.15)
                self.canvas.coords(oid, trail_x - sz, trail_y - sz, trail_x + sz, trail_y + sz)
                self.canvas.itemconfig(oid, fill=s.color(fade * 0.8), outline="")
        self.canvas.tag_lower("particle")
        self.canvas.after(self.delay, self._tick)

    def stop(self):
        self.running = False
