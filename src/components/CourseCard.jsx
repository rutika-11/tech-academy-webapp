import "./CourseCard.css";

const CourseCard = ({ provider, title, type, chips = [], credit = "Credit offered", onEnroll }) => {
    return (
        <article className="course-card">
            <div className="course-content">
                <p className="course-provider">{provider}</p>
                <h3 className="course-title">{title}</h3>
                <p className="course-type">{type}</p>
            </div>

            <div className="course-actions">
                <button className="enroll-btn" type="button" onClick={onEnroll}>
                    Enroll
                </button>
                <span className="chip">{credit}</span>
            </div>

            <div className="course-chip-row">
                {chips.map((chip) => (
                    <span key={chip} className="chip">
                        {chip}
                    </span>
                ))}
            </div>
        </article>
    );
};

export default CourseCard;