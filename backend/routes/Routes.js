const express=require("express");
const router=express.Router();
const controller=require("../controllers/controller")
const upload=require("../middleware/upload")
const validate=require("../middleware/validate")

router.post("/hotels",
        upload.single("image"), validate,
        controller.createhotel)

router.get("/hotels",controller.getALL )
router.get("/hotels/:id",controller.getOne)

router.put("/hotels/:id",
    upload.single("image"),validate,
    controller.updateOne
)

router.delete("/hotels/:id",controller.deleteDetail)

module.exports=router;