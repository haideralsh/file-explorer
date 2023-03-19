import type { NextPage } from "next";
import FileTreeContainer from "../components/FileTreeContainer";
import fileTree from "../models/fileTree.example";

const Home: NextPage = () => {
  return <FileTreeContainer fileTree={fileTree} />;
};

export default Home;
