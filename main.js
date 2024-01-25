// عند النقر على زر البدء
let startButton = document.querySelector(".control-buttons span");
let controlButtons = document.querySelector(".control-buttons");
startButton.onclick = function () {
  // إضافة فئة "click" لزر البدء لتحقيق تأثير بصري
  startButton.classList.add("click");

  // إزالة فئة "click" بعد فترة زمنية قصيرة
  setTimeout(() => {
    startButton.classList.remove("click");
  }, 100);

  // الانتظار لفترة زمنية ثم طرح سؤال للمستخدم
  setTimeout(() => {
    // طلب اسم المستخدم
    let name = prompt("What Is Your Name ? ");


    


    if (!name || name.trim() === "") {
      // إذا لم يُدخل المستخدم اسمًا، قم بتعيين قيمة افتراضية
      document.querySelector(".name span").innerHTML = "Unknown";
    } else {
      // إذا تم إدخال اسم، قم بعرضه في مكان مناسب
      document.querySelector(".name span").innerHTML = name;
    }

    // إزالة عناصر التحكم بعد النقر
    controlButtons.remove();
  }, 400);
};

// إعداد بعض المتغيرات
let duration = 1000;
let tries = 0;

// الحصول على عناصر المربعات وتخزينها في مصفوفة
let blockArea = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockArea.children);

// إعداد ترتيب عشوائي للمربعات
let order = Array.from(suffle(blocks));

blocks.forEach((block, index) => {
  // تعيين ترتيب عشوائي لكل مربع
  block.style.order = order.indexOf(order[index]);

  // إضافة مستمع للنقر على المربع
  block.addEventListener("click", function () {
    block.classList.add("fillped");
    let fillpedCards = Array.from(
      document.querySelectorAll(".memory-game-blocks .fillped")
    );

    // التحقق من وجود مربعين مفتوحين
    if (fillpedCards.length == 2) {
      stopClicking();
      checking(fillpedCards[0], fillpedCards[1]);
    }
  });
});

// وظيفة لتعطيل النقر لفترة زمنية بعد النقر على مربع
function stopClicking() {
  blockArea.classList.add("clicked");

  setTimeout(() => {
    blockArea.classList.remove("clicked");
  }, duration);
}

// وظيفة للتحقق من تطابق مربعين
function checking(blockOne, blockTwo) {
  if (blockOne.dataset.technology === blockTwo.dataset.technology) {
    // في حالة التطابق
    blockOne.classList.remove("fillped");
    blockTwo.classList.remove("fillped");
    blockOne.classList.add("match");
    blockTwo.classList.add("match");
    document.querySelector(".win").play();
  } else {
    // في حالة عدم التطابق
    tries++;
    document.querySelector(".tries span").innerHTML = tries;
    setTimeout(() => {
      blockOne.classList.remove("fillped");
      blockTwo.classList.remove("fillped");
    }, duration);
    document.querySelector(".lose").play();
  }
}

// وظيفة لخلط العناصر في المصفوفة
function suffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}