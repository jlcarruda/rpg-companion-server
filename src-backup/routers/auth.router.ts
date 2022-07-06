import { Router } from "express";

const router = Router();

const RESOURCE = "/users";

const mockUser = {
  name: "joao",
  characters: [
    {
      name: "Ecclesia",
      race: "elf",
      class: "Wizard",
    },
  ],
};

router.post(`${RESOURCE}/signin`, (req, res, next) => {
  res.status(200).json({ data: mockUser });
  next();
});

export default router;
