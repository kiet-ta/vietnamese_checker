const COMPANY_CONVERSATION_IDS = ["<Your ID group messages>"];

const vietnameseRegex = /[ăâêôơưđáàạảãấầậẩẫắằặẳẵếềệểễoỏõóòốồộổỗớờợởỡứừựửữđ]/i;

function getConversationId() {
  const match = window.location.pathname.match(/\/messages\/t\/([^/]+)/);
  return match ? match[1] : null;
}

function isCompanyGroup() {
  const id = getConversationId();
  return id && COMPANY_CONVERSATION_IDS.includes(id);
}

function attach() {
  document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
    if (el._vietAttached) return;
    el._vietAttached = true;

    el.addEventListener(
      "input",
      () => {
        if (!isCompanyGroup()) return;

        const text = el.textContent || "";
        if (vietnameseRegex.test(text)) {
          alert("⚠️ Company Group: phát hiện gõ tiếng Việt");
        }
      },
      true,
    );
  });
}

const observer = new MutationObserver(attach);
observer.observe(document.body, { childList: true, subtree: true });
attach();
