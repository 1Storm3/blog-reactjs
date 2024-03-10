import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import s from "./ProfilePage.module.css";
import { useAuth } from "../../Auth";

const ProfilePage: FunctionComponent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logouting = () => {
    logout();
  };
  const onMonotoneAddClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className={s.page}>
      <section className={s.dAsset}>
        <div className={s.frameGroup}>
          <div className={s.stories}>Stories</div>
          <button className={s.btn} onClick={logouting}>
            Выход
          </button>
        </div>
        <div className={s.addFrame}>
          <div className={s.frameParent}>
            <div className={s.rectangleParent}>
              <div className={s.frameChild} />
              <div className={s.plusWrapper}>
                <img
                  className={s.plusIcon}
                  loading="eager"
                  alt=""
                  src="/plus.svg"
                />
              </div>
              <div className={s.addNew}>{`Add new `}</div>
            </div>
            <img
              className={s.topNavIcon}
              loading="eager"
              alt=""
              src="/rectangle-12@2x.png"
            />
            <img
              className={s.logoSquareIcon}
              loading="eager"
              alt=""
              src="/rectangle-15@2x.png"
            />
            <img
              className={s.buttonFrameIcon}
              loading="eager"
              alt=""
              src="/rectangle-14@2x.png"
            />
            <img
              className={s.buttonIconFab}
              loading="eager"
              alt=""
              src="/rectangle-13@2x.png"
            />
          </div>
        </div>
      </section>
      <section className={s.monotoneAdd} onClick={onMonotoneAddClick}>
        <div className={s.profile}>
          <img
            className={s.frameIcon}
            loading="eager"
            alt=""
            src="/ellipse-4@2x.png"
          />
          <div className={s.timeStamp}>
            <div className={s.evgenyStorm}>Evgeny Storm</div>
            <div className={s.hourAgo}>1 hour ago</div>
          </div>
        </div>
        <div className={s.backgroundFrame}>
          <img
            className={s.rectangleShapeIcon}
            loading="eager"
            alt=""
            src="/rectangle-12@2x.png"
          />
          <div className={s.omgCheckOut}>
            OMG!! Check out this view! So freakin’ amazing...
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
