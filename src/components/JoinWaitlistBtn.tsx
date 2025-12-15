import "@/styles/JoinWaitlistBtn.css";

const JoinWaitlistBtn = () => {
  return (
    <div className="joinwaitlist-btn-wrapper">
      <div className="joinwaitlist-btn">
        <p>Join waitlist</p>
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.56565 0.641601L11.6426 5.71852L6.56565 10.7954M10.9374 5.71852L0.642577 5.71852"
            stroke="white"
            strokeWidth="1.28333"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default JoinWaitlistBtn;
