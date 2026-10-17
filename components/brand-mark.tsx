import Image from 'next/image';
import { sitePath } from '@/lib/base-path';

// Compact variants retain the approved paths and omit the small descriptor.
export function BrandMark() {
  return (
    <picture className="brand-mark">
      <source
        media="(prefers-color-scheme: dark)"
        srcSet={sitePath('/brand/symbol-inverse.svg')}
      />
      <Image
        src={sitePath('/brand/symbol-color.svg')}
        width={320}
        height={340}
        alt=""
        loading="eager"
      />
    </picture>
  );
}

export function BrandWordmark() {
  return (
    <picture className="brand-wordmark">
      <source
        media="(prefers-color-scheme: dark)"
        srcSet={sitePath('/brand/wordmark-inverse.svg')}
      />
      <Image
        src={sitePath('/brand/wordmark.svg')}
        width={1290}
        height={362}
        alt=""
        loading="eager"
      />
    </picture>
  );
}

export function BrandSignature() {
  return (
    <div className="brand-signature" translate="no">
      <Image
        className="brand-signature-full"
        src={sitePath('/brand/primary-color.svg')}
        width={1024}
        height={512}
        alt="Chiarocode — Music education software"
        loading="lazy"
      />
      <div className="brand-signature-compact">
        <Image
          src={sitePath('/brand/symbol-color.svg')}
          width={320}
          height={340}
          alt="Chiarocode"
          loading="lazy"
        />
        <Image
          src={sitePath('/brand/wordmark.svg')}
          width={1290}
          height={362}
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  );
}
