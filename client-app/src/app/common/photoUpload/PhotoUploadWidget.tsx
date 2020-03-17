import React, { Fragment, useState, useEffect } from "react";

import { PhotoWidgetDropzone } from "./PhotoWidgetDropzone";
import { PhotoWidgetCropper } from "./PhotoWidgetCropper";

import { Grid, Header } from "semantic-ui-react";

export const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  // compentWillUnmount
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <div
              className="img-preview"
              style={{ height: "200px", overflow: "hidden" }}
            ></div>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
