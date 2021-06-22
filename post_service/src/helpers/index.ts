import sharp from 'sharp';
export const convertToAvif = async (input: Buffer) => {
	return sharp(input).avif().toBuffer();
};
