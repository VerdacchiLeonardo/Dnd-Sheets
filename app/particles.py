"""
Floating spirit/ghost particle animation for the canvas background.
"""
import math
import random
import tkinter as tk

from app.theme import PARTICLE_COLORS


class _Particle:
    __slots__ = ("x", "y", "vx", "vy", "size", "r", "g", "b",
                 "life", "max_life", "phase", "canvas_id")

    def __init__(self, w: int, h: int, spawn_bottom: bool = True):
        self.canvas_id: int | None = None
        self._init(w, h, spawn_bottom)

    def _init(self, w: int, h: int, spawn_bottom: bool = True):
        self.x = random.uniform(0, w)
        self.y = (random.uniform(h * 0.6, h + 10) if spawn_bottom
                  else random.uniform(0, h))
        self.vx = random.uniform(-0.25, 0.25)
        self.vy = random.uniform(-0.7, -0.2)
        self.size = random.uniform(1.5, 4.0)
        r, g, b = random.choice(PARTICLE_COLORS)
        self.r, self.g, self.b = r, g, b
        self.max_life = random.randint(90, 220)
        self.life = (random.randint(0, self.max_life) if not spawn_bottom
                     else self.max_life)
        self.phase = random.uniform(0, math.pi * 2)

    def reset(self, w: int, h: int):
        self._init(w, h, spawn_bottom=True)

    def update(self) -> bool:
        self.life -= 1
        self.x += self.vx + math.sin(self.phase + (self.max_life - self.life) * 0.05) * 0.35
        self.y += self.vy
        return self.life > 0

    def color(self) -> str:
        t = self.life / self.max_life          # 1→0
        alpha = math.sin(math.pi * (1.0 - t)) # 0→1→0
        r = int(self.r * alpha)
        g = int(self.g * alpha)
        b = int(self.b * alpha)
        return f"#{r:02x}{g:02x}{b:02x}"


class ParticleSystem:
    """Manages N floating spirit particles on a tk.Canvas."""

    def __init__(self, canvas: tk.Canvas, count: int = 75, fps: int = 30):
        self.canvas = canvas
        self.count  = count
        self.delay  = max(16, 1000 // fps)
        self.running = True
        self.w = canvas.winfo_width()  or 800
        self.h = canvas.winfo_height() or 600
        self._particles: list[_Particle] = []
        canvas.bind("<Configure>", self._on_resize, add="+")
        self._spawn_all()
        self._tick()

    def _on_resize(self, event: tk.Event):
        self.w = event.width
        self.h = event.height

    def _spawn_all(self):
        for _ in range(self.count):
            p = _Particle(self.w, self.h, spawn_bottom=False)
            p.canvas_id = self.canvas.create_oval(
                p.x - p.size, p.y - p.size,
                p.x + p.size, p.y + p.size,
                fill=p.color(), outline="", tags="particle",
            )
            self._particles.append(p)

    def _tick(self):
        if not self.running:
            return
        w, h = self.w, self.h
        for p in self._particles:
            alive = p.update()
            if not alive or p.y < -p.size:
                p.reset(w, h)
            c = p.color()
            self.canvas.coords(
                p.canvas_id,
                p.x - p.size, p.y - p.size,
                p.x + p.size, p.y + p.size,
            )
            self.canvas.itemconfig(p.canvas_id, fill=c, outline=c)
        # Keep particles behind static content
        self.canvas.tag_lower("particle")
        self.canvas.after(self.delay, self._tick)

    def stop(self):
        self.running = False
