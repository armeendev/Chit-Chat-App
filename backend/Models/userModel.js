const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      // required: true,
      default:
        "https://www.bing.com/images/search?view=detailV2&ccid=PzAcDKv1&id=ACB9188B54AB5C0F305C1980BF019EC9290B9D3B&thid=OIP.PzAcDKv1Xw_PytPzfiVjeQAAAA&mediaurl=https%3a%2f%2fwww.mn4wda.org%2fwp-content%2fuploads%2f2018%2f03%2fno_pic.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.3f301c0cabf55f0fcfcad3f37e256379%3frik%3dO50LKcmeAb%252bAGQ%26pid%3dImgRaw%26r%3d0&exph=300&expw=300&q=no+pic&simid=608046663846480558&FORM=IRPRST&ck=8D730FCF892C47E79481984980122470&selectedIndex=0&idpp=overlayview&ajaxhist=0&ajaxserp=0",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
