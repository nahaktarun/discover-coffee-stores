import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'

export default function Home() {

  const handleOnBannerBtnClick = () =>{
    console.log("Button clicked");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Cafe Near Me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>

        <Image
          src="/static/hero-image.png"
          alt="heroimage"
          width={700}
          height={400}
        />
        </div>
      </main>
    </div>
  );
}

