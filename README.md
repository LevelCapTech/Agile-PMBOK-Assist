![GitHub last commit](https://img.shields.io/github/last-commit/LevelCapTech/Agile-PMBOK-Assist)
![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/LevelCapTech/Agile-PMBOK-Assist)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/LevelCapTech/Agile-PMBOK-Assist)
![GitHub Repo stars](https://img.shields.io/github/stars/LevelCapTech/Agile-PMBOK-Assist)

# python-docker-template
Docker環境内でPythonスクリプトを実行するシンプルなテンプレート
テンプレートからリポジトリを新規作成した場合は、[README_INIT_REPO.md](docs/README_INIT_REPO.md)を参照してください。このファイルは速やかに編集することをオススメします。

# Installation

## 前提条件
- Python 3.10 以上
- pip
- Git

## 手順
### 1. Clone
```
git clone https://github.com/LevelCapTech/Agile-PMBOK-Assist.git
cd Agile-PMBOK-Assist
```

### 2. 仮想環境作成（推奨）
```
python -m venv .venv
source .venv/bin/activate  # Mac/Linux
# .venv\\Scripts\\activate  # Windows
```

### 3. 依存関係インストール
requirements.txt が存在するため、以下を実行します。
```
pip install -r requirements.txt
```

### 4. 実行方法
```
mkdir -p logs
export LOG_DIR="$(pwd)/logs"
python app/python/main.py
```
