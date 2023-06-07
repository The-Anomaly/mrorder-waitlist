import { Footer, Navbar } from "components";
import styles from "./styles.module.scss";
import {
  FastForward,
  OfficeBuilding,
  SmileImg,
  Tag,
  chefImg,
  customerImg,
  deliveryImg,
  foodImg,
  mockup,
} from "assets";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <section className={styles.heroBg}>
          <div className={`appContainer ${styles.hero}`}>
            <h1>Mr Order is Bringing something New</h1>
            <p>Be the first to know out when we go live</p>
            <button>Join Waitlist</button>
          </div>
          <SmileImg className={styles.img} />
        </section>
        <section className={`appContainer ${styles.mockup}`}>
          <img src={mockup} alt="" />
          <p>
            Mr Order lets you browse menus, order food, and get fast delivery.
            Plus, you can use it to order in the restaurant without a waiter.
            It's all on your mobile device, for ultimate convenience.
          </p>
        </section>
        <section className={styles.offerBg}>
          <div className={`appContainer ${styles.offerSec}`}>
            <h2>What we offer:</h2>
            <div className={styles.offerList}>
              <div className={styles.offer}>
                <OfficeBuilding />
                <p>In-Restaurant Service</p>
                <p>
                  Enjoy a self-service experience with Yowa! Say goodbye to
                  waiting for a physical waiter and order directly from your
                  phone.
                </p>
              </div>
              <div className={styles.offer}>
                <Tag />
                <p>Best Deals</p>
                <p>
                  Get the best deals from your favorite restaurants with us and
                  earn meal vouchers by referring a friend! It's a win-win
                  situation for you and your taste buds.
                </p>
              </div>
              <div className={styles.offer}>
                <FastForward />
                <p>Speed</p>
                <p>
                  Every time, enjoy a swift and delightful meal thanks to our
                  quick order preparation process. In a jiffy, your meal is
                  served from the pot to your table!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={`appContainer ${styles.standout}`}>
          <h3>Why we stand-out</h3>
          <div className={styles.standoutList}>
            <div>
              <img src={deliveryImg} />
              <p>Quick Delivery</p>
            </div>
            <div>
              <img src={chefImg} />
              <p>top rated restaurants </p>
            </div>
            <div>
              <img src={foodImg} />
              <p> 1000+ cuisines </p>
            </div>
            <div>
              <img src={customerImg} />
              <p>100% Satisfaction </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export { Home };
