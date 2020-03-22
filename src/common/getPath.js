function getPath(path) {
  return `/${process.env.VERSION}${process.env.VERSION_NUMBER}/${path}`;
}

export default getPath;
