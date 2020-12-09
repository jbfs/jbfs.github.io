#!/usr/bin/env python3
"""Generate html given yaml."""
import argparse
import yaml
from templates import TEMPLATES

parser = argparse.ArgumentParser()

parser.add_argument('yaml_file', nargs='?', default='books.yaml')
parser.add_argument(
    '-o',
    help='HTML filename.',
    dest='html_file',
    default='index.html')

if __name__ == "__main__":
    args = parser.parse_args()

    with open(args.yaml_file) as h:
        data = yaml.safe_load(h)

    for book in data['books']:
        for attribute in ['title', 'author', 'year', 'language']:
            if attribute not in book:
                raise ValueError(f'Providing a {attribute} is mandatory.')
        for attribute in ['volume', 'genre', 'info']:
            if attribute not in book:
                book[attribute] = None

    html = f'<!-- This file is automatically generated. -->\n'
    books = [TEMPLATES['book'].format(**book) for book in data['books']]
    html += TEMPLATES['body'].format(books=''.join(books))
    html += TEMPLATES['info']

    with open(args.html_file, 'w') as h:
        h.write(html)