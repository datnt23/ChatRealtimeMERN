const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      // required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);
//Bcryptjs là một thư viện mã hóa mật khẩu được sử dụng trong Node.js
//để mã hóa mật khẩu người dùng trước khi lưu trữ trong cơ sở dữ liệu
//để đảm bảo an toàn và bảo mật.Bcryptjs sử dụng một thuật toán băm mạnh mẽ
//để mã hóa mật khẩu, làm cho việc giải mã mật khẩu trở nên khó khăn và thời gian tốn kém hơn.

//Bcryptjs được tạo ra như một phiên bản thu gọn của bcrypt,
//vì vậy nó có kích thước nhỏ hơn và dễ dàng để sử dụng hơn trong môi trường Node.js.

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
