PYTHON=python3
VENV_NAME=.venv

.PHONY: ssg
ssg:
	@source .venv/bin/activate && ./ssg.py

.PHONY: open
open:
	@open index.html

.PHONY: setup-venv
setup-venv:
	${PYTHON} -m venv ${VENV_NAME} && \
	. ${VENV_NAME}/bin/activate && \
	pip install --upgrade pip && \
	pip install -r .requirements.txt

.PHONY: clean
clean:
	@rm -rf index.html
