const sendMessage = async (email, name, subject, message) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/message",
      data: {
        email: email,
        name: name,
        subject,
        message,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      alert("Query submitted successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const sendMsgBtn = document.getElementById("sendMsgBtn");

sendMsgBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const msg = document.getElementById("msg").value;
  signup(email, name, subject, msg);
});
