import os
import time
import random
import json
from PIL import Image
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify, render_template, send_from_directory

app = Flask(__name__)

app.config["UPLOAD_FOLDER"] = "uploads"
app.config["THUMBNAILS"] = "static/thumbnails"
app.config["MODEL"] = "models/output_graph.pb"
app.config["LABELFILE"] = "models/output_labels.txt"

names_dict = {
    "checkeredgarter": "Checkered Garter Snake",
    "coachwhip": "Coachwhip Snake",
    "dekaysbrown": "Dekays Brown Snake",
    "hognose": "Hognose Snake",
    "kingsnakespeckled": "Kingsnake, Speckeled",
    "kingsnakegraybanded": "Kingsnake, Grey Banded",
    "ratsnake": "Ratsnake",
    "ribbonsnake": "Ribbon Snake",
    "ringneck": "Ring Neck Snake",
    "roughearth": "Rough Earth Snake",
    "smoothgreen": "Green Snake",
    "watersnake": "Water Snake",
    "yellowbellyracer": "Yellow Bellied Racer",
    "copperhead": "Copperhead Snake",
    "coral": "Coral Snake",
    "cottonmouth": "Cottonmouth Snake",
    "rattlerdiamondback": "Western Diamnondback Rattler Snake",
}
venom_dict = {
    "Checkered Garter Snake": "false",
    "Coachwhip Snake": "false",
    "Dekays Brown Snake": "false",
    "Hognose Snake": "false",
    "Kingsnake, Grey Banded": "false",
    "Kingsnake, Speckeled": "false",
    "Ratsnake": "false",
    "Ribbon Snake": "false",
    "Ring Neck Snake": "false",
    "Rough Earth Snake": "false",
    "Green Snake": "false",
    "Water Snake": "false",
    "Yellow Bellied Racer": "false",
    "Copperhead Snake": "true",
    "Cottonmouth Snake": "true",
    "Western Diamnondback Rattler Snake": "true",
    "Coral Snake": "true",
}


def create_thumbnail(file):
    size = 400, 400
    im = Image.open(file)
    im = im.convert("RGB")
    im.thumbnail(size)
    f, name = os.path.split(file)
    filepath = os.path.join(app.config["THUMBNAILS"], name)
    im.save(filepath, "JPEG")
    url = filepath.replace("\\", "/")
    return url


def predict_image(img):
    model = None
    model = VGG19(include_top=True, weights="imagenet")
    # Preprocess image for model prediction
    # This step handles scaling and normalization for VGG19
    x = None
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    # Make predictions
    predictions = model.predict(x)
    prediction_result = decode_predictions(predictions, top=1)[0]
    print("Prediction:", prediction_result)
    # TO DO look for dictionary

    # return snake type
    K.clear_session()


def read_tensor_from_image_file(
    file_name, input_height=299, input_width=299, input_mean=0, input_std=255
):
    input_name = "file_reader"
    output_name = "normalized"
    file_reader = tf.io.read_file(file_name, input_name)
    if file_name.endswith(".png"):
        image_reader = tf.image.decode_png(file_reader, channels=3, name="png_reader")
    elif file_name.endswith(".gif"):
        image_reader = tf.squeeze(tf.image.decode_gif(file_reader, name="gif_reader"))
    elif file_name.endswith(".bmp"):
        image_reader = tf.image.decode_bmp(file_reader, name="bmp_reader")
    else:
        image_reader = tf.image.decode_jpeg(file_reader, channels=3, name="jpeg_reader")
    float_caster = tf.cast(image_reader, tf.float32)
    dims_expander = tf.expand_dims(float_caster, 0)
    resized = tf.compat.v1.image.resize_bilinear(
        dims_expander, [input_height, input_width]
    )
    normalized = tf.divide(tf.subtract(resized, [input_mean]), [input_std])
    sess = tf.compat.v1.Session()
    result = sess.run(normalized)

    return result


def load_labels(label_file):
    label = []
    proto_as_ascii_lines = tf.io.gfile.GFile(label_file).readlines()
    for l in proto_as_ascii_lines:
        label.append(l.rstrip())
    return label


def load_graph(model_file):
    graph = tf.Graph()
    graph_def = tf.compat.v1.GraphDef()

    with open(model_file, "rb") as f:
        graph_def.ParseFromString(f.read())
    with graph.as_default():
        tf.import_graph_def(graph_def)

    return graph


def found_in_dict(label):
    return venom_dict[label]


@app.route("/api")
def show_snakes():
    with open(os.path.join(app.root_path, "static/api/snakes.json")) as f:
        data = json.load(f)
    return json.dumps(data)


@app.route("/")
@app.route("/snakes")
@app.route("/snakes/")
@app.route("/about")
def show_form():
    return render_template("index.html")


@app.route("/snakes/<snake>")
def show_snake(snake):
    return render_template("index.html")


@app.route("/img/snakes/<image_name>")
def get_image(image_name):
    # print(f"image name: {image_name}")
    dir = os.path.join(app.root_path, "static/img/snakes/")
    print(f"dir {dir}")
    return send_from_directory(dir, image_name)


@app.route("/idmysnake", methods=["POST"])
def upload_file(tn=None):
    if request.files.get("file"):
        # print("GOT FILE")
        # read the file
        file = request.files["file"]
        # get the original filename extension
        # print(f'file :{file.filename}')
        ext = file.filename.split(".")[1]
        # create a filename based on img = random number (1-20) date and file extension
        fname = "img_snake." + ext
        # create a path to the uploads folder
        file_name = os.path.join(app.config["UPLOAD_FOLDER"], fname)
        # Save the file to the uploads folder
        file.save(file_name)
        # model_file to use
        model_file = app.config["MODEL"]
        label_file = app.config["LABELFILE"]
        input_height = 299
        input_width = 299
        input_mean = 0
        input_std = 255
        input_layer = "Placeholder"
        output_layer = "final_result"
        # load graph
        graph = load_graph(model_file)
        t = read_tensor_from_image_file(
            file_name,
            input_height=input_height,
            input_width=input_width,
            input_mean=input_mean,
            input_std=input_std,
        )

        input_name = "import/" + input_layer
        output_name = "import/" + output_layer
        input_operation = graph.get_operation_by_name(input_name)
        output_operation = graph.get_operation_by_name(output_name)
        with tf.compat.v1.Session(graph=graph) as sess:
            results = sess.run(
                output_operation.outputs[0], {input_operation.outputs[0]: t}
            )
        results = np.squeeze(results)
        top_k = results.argsort()[-5:][::-1]
        labels = load_labels(label_file)

        winning_label = labels[top_k[0]]
        winning_pct = results[top_k[0]]
        # print(winning_label)
        long_name = names_dict[winning_label]

        venomous = "false"
        # print("accuracy "+str(winning_pct))
        if winning_pct < 0.5:
            venomous = "undetermined"
        else:
            venomous = found_in_dict(long_name)

        # print(long_name + " is venomous? : "+venomous)
        img = create_thumbnail(file_name)
        slug = long_name.lower().replace(" ", "-")
        # print("image "+img)
        js = (
            '{"img":"'
            + img
            + '","venomous":"'
            + venomous
            + '","snake":"'
            + long_name
            + '","slug":"'
            + slug
            + '"}'
        )
        return js


if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("DEBUG", False)
    app.run(host="0.0.0.0", port=5000, debug=ENVIRONMENT_DEBUG)

