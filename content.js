const COMPANY_CONVERSATION_IDS = ["<Your ID group messages>"];

const vietnameseRegex =
  /[ăâêôơưđáàạảãấầậẩẫắằặẳẵếềệểễốồộổỗớờợởỡứừựửữđíịìỉýỳỷỵ]/i;

const BLOCKED_PHRASES = ["gõ", "nha", " ae"];

function getConversationId() {
  const match = window.location.pathname.match(/\/messages\/t\/([^/]+)/);
  return match ? match[1] : null;
}

function isCompanyGroup() {
  const id = getConversationId();
  return id && COMPANY_CONVERSATION_IDS.includes(id);
}

function containsBlockedPhrase(text) {
  const lower = text.toLowerCase();
  return BLOCKED_PHRASES.some((p) => lower.includes(p));
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

        if (vietnameseRegex.test(text) || containsBlockedPhrase(text)) {
          alert("⚠️ Group công ty: tiếng Việt được phát hiện");
        }
      },
      true,
    );
  });
}

const observer = new MutationObserver(attach);
observer.observe(document.body, { childList: true, subtree: true });
attach();
