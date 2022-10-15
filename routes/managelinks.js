import { Router } from "express";
import auth from "../middleware/authorization.js";
import db from "../models/schema.js";

const router = Router();

router.post("/addlink", auth, async (req, resp) => {
  try {
    const { appname, link } = req.body;
    const user = await db.findById(req.user);
    if (user.userinput.appname.length >= 7) {
      return resp.status(401).json("You can't add more links");
    }
    const addlinks = await db.findOneAndUpdate(
      {
        username: user.username,
      },
      {
        userinput: {
          appname: [...user.userinput.appname, appname],
          links: [...user.userinput.links, link],
        },
      }
    );
    resp.status(200).json(addlinks);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/removelink", auth, async (req, resp) => {
  try {
    const { appname } = req.body;
    const user = await db.findById(req.user);
    const index = user.userinput.appname.indexOf(appname);
    if (index < 0) {
      return resp.status(401).json("Url Not Found");
    }
    user.userinput.appname.splice(index, 1);
    user.userinput.links.splice(index, 1);
    const addlinks = await db.findOneAndUpdate(
      {
        username: user.username,
      },
      {
        userinput: {
          appname: [...user.userinput.appname],
          links: [...user.userinput.links],
        },
      }
    );
    resp.status(200).json(addlinks);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/getall/:username", async (req, resp) => {
  const user = req.params.username;
  // resp.send(user);
  const data = await db.findOne({
    username: user.toLowerCase(),
  });
  if(data === null)
  {
    return resp.status(401).json(false);
  }
  resp.send(data);
});

router.post("/addbio", auth, async (req, resp) => {
  try {
    const { userBio } = req.body;
    const user = await db.findById(req.user);
    const bio = await db.findOneAndUpdate(
      {
        username: user.username,
      },
      {
        userbio: userBio,
      }
    );
    resp.status(200).json(bio);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/addimage", auth, async (req, resp) => {
  try {
    const { imageUrl } = req.body;
    const user = await db.findById(req.user);
    const image = await db.findOneAndUpdate(
      {
        username: user.username,
      },
      {
        imgurl: imageUrl,
      }
    );
    resp.status(200).json(image);
  } catch (err) {
    console.log(err.message);
  }
});
export default router;
