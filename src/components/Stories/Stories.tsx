import "./Stories.css";

const STORY_SEEDS = [
  "michi_gato", "catto_bravo", "felix_paws", "luna_felina",
  "garfield_jr", "whiskers99", "nala_cat",
];

const Stories = () => {
  return (
    <div className="stories">
      <h2 className="section-title">STORIES</h2>
      <div className="stories-list">
        {STORY_SEEDS.map((seed) => (
          <div className="story-item" key={seed}>
            <div className="story-avatar-ring">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                alt={seed}
                className="story-avatar"
              />
            </div>
            <span className="story-username">@{seed.replace("_", "")}</span>
          </div>
        ))}
        <button className="story-arrow-btn" aria-label="Ver más">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Stories;