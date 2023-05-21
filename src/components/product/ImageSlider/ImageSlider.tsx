import { ProductImage } from '@common/types/product'
import { Grid, ImageBox } from '@components/UI'
import classNames from 'classnames'
import { FC, useState } from 'react'
import s from './ImageSlider.module.scss'

interface SliderProps {
  images: ProductImage[]
}

const ImageSlider: FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getDotClassName = (index: number, currentIndex: number) => {
    return classNames(s.dots, { [s.selected]: index === currentIndex })
  }

  const handleUniqueClick = (index: number) => () => {
    setCurrentIndex(index)
  }

  return (
    <div>
      <div className={s['main-image-box']}>
        <div className={s['left-arrow']} onClick={goToPrevious}>
          &lsaquo;
        </div>
        <ImageBox
          src={images[currentIndex]?.url}
          alt={images[currentIndex]?.alt}
        />
        <div className={s['right-arrow']} onClick={goToNext}>
          &rsaquo;
        </div>
        <div className={s['dots-box']}>
          {images.map((image, index) => (
            <div
              key={index}
              className={getDotClassName(index, currentIndex)}
              onClick={() => goToSlide(index)}
            >
              &bull;
            </div>
          ))}
        </div>
      </div>
      <Grid cols={4} extraClasses={s['preshow-images-box']}>
        {images.map((image, index) => (
          <div
            key={image.url}
            className={s['preshow-image']}
            onClick={handleUniqueClick(index)}
          >
            <ImageBox src={image.url} alt={image.alt} />
          </div>
        ))}
      </Grid>
    </div>
  )
}

export default ImageSlider